const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/registr',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
              message: 'Некорректные данные для регистрации'
            })
        }
        const {email, password} = req.body
        const candidate = await User.findeOne({ email })
        if (candidate) {
          return  res.status(400).json({message: 'Один такой уже есть'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({message: 'Пользователь успешно создан'})

    } catch (e) {
      res.status(500).json({message: 'Атака захлебнулась, попробуйте еще раз'})
    }

})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные для входа в систему'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте еще'})
            }
            const token = jwt.sign(
                { userId: user.is },
                config.get('jwtSecret'),
            { exiresIn: '1h'}
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({message: 'Атака захлебнулась, попробуйте еще раз'})
        }


    })

module.exports = router

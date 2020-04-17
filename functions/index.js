const cors = require('cors')({origin: true})
const functions = require('firebase-functions')

exports.checkAdminPassword = functions.https.onCall((data, context) => {
    let adminPassword = data.adminPassword
    let isValid = (adminPassword === 'Nuccma6246T98')
    if (isValid) {
        return {
            "status": "success"
        }
    } else {
        return {
            "status": "failure"
        }
    }
})


// async (req, res) => {
//     cors(req, res, () => {
//         let {adminPassword} = req.body
//         let isValid = (adminPassword === 'Nuccma6246T98')
//         if (isValid) {
//             res.status(200).send()
//         } else {
//             res.status(406).send({
//                 "message": "كلمه السر الخاصه بالوزير ليسه صحيحه"
//             })
//         }
//     })
// })

const {Router} = require('express');

const {db} = require('../firebase');

const router = Router();


////rutas que nos permite listar los contactos de nuestra base de datos////

router.get('/', async (req, res) => {

    
    const querySnapshot = await db.collection('contacts').get()
    
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,

        //Forma mas corta de recorrer los objetos
        ...doc.data()
        
        
        //firstname: doc.data().firstname,
        //lastname: doc.data().lastname,
        //email: doc.data().email,
        //phone: doc.data().phone,
        //status: doc.data().status

    }))

    

    res.render('index', {contacts})
});



///////ruta que nos permite añadir un nuevo contacto //////

    router.post('/new-contact',  async (req, res) => {

        const {firstname, lastname, email, phone } = req.body
        await db.collection('contacts').add({
            firstname, 
            lastname,
            email,
            phone
        })

        res.redirect('/')
    })


///////ruta que nos permite obtener los datos mediante un id //////

    router.get('/edit-contact/:id', async (req, res) => {

        
        const doc = await db.collection('contacts').doc(req.params.id).get()

        console.log({
            id: doc.id,
            ...doc.data()
        });

        res.send('edit contact')

    } )


///////ruta que nos permite eliminar un contacto de la lista///////

    router.get('/delete-contact/:id', async (req, res) => {

        await db.collection('contacts').doc(req.params.id).delete()

        res.redirect('/')
    })


    //
    //


    router.post('/update-contact/:id', async (req, res) => {    

        await db.collection('contacts').doc(req.params.id).update(req.body)


        res.send('contact update')

    })


    module.exports = router;
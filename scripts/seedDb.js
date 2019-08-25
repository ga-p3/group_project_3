const { User, Folder, Note, UserFolder } = require('../models/index')


const seedDb = async () => {
    try {
        await User.destroy({
            where: {}
        })
        await Folder.destroy({
            where: {}
        })
        await Note.destroy({
            where: {}
        })
        await UserFolder.destroy({
            where: {}
        })
        const user1 = await User.create({
            name: 'Alexander Barbaran',
            email: 'abarbaran@fakemail.com',
            password: 'alex123'
        })

        const user2 = await User.create({
            name: 'Charles Beach',
            email: 'cbeach@fakemail.com',
            password: 'charles456'
        })
        const user3 = await User.create({
            name: 'Jhordan Figueroa',
            email: 'jfigueroa@fakemail.com',
            password: 'jordan789'
        })

        const user4 = await User.create({
            name: 'Phil Ma',
            email: 'pma@fakemail.com',
            password: 'phil012'
        })

        const folder1 = await Folder.create({
            title: 'Work',
        })

        const folder2 = await Folder.create({
            title: 'School'
        })

        const folder3 = await Folder.create({
            title: 'Health'
        })

        const folder4 = await Folder.create({
            title: 'Miscellaneous'
        })

        const folder5 = await Folder.create({
            title: 'Work',
        })

        const folder6 = await Folder.create({
            title: 'School'
        })

        const folder7 = await Folder.create({
            title: 'Health'
        })

        const folder8 = await Folder.create({
            title: 'Miscellaneous'
        })

        const folder9 = await Folder.create({
            title: 'Work',
        })

        const folder10 = await Folder.create({
            title: 'School'
        })

        const folder11 = await Folder.create({
            title: 'Health'
        })

        const folder12 = await Folder.create({
            title: 'Miscellaneous'
        })

        const folder13 = await Folder.create({
            title: 'Work',
        })

        const folder14 = await Folder.create({
            title: 'School'
        })

        const folder15 = await Folder.create({
            title: 'Health'
        })

        const folder16 = await Folder.create({
            title: 'Miscellaneous'
        })

        const note1 = await Note.create({
            title: 'help',
            content: 'help again'
        })

        const note2 = await Note.create({
            title: 'this not good',
            content: 'really not good'
        })

        const note3 = await Note.create({
            title: 'already',
            content: 'are we already there'
        })

        const note4 = await Note.create({
            title: 'finish',
            content: 'can we finish'
        })

        const note5 = await Note.create({
            title: 'jump',
            content: 'jump again'
        })

        const note6 = await Note.create({
            title: 'this not bad',
            content: 'really not bad'
        })

        const note7 = await Note.create({
            title: 'not ready',
            content: 'are we there yet'
        })

        const note8 = await Note.create({
            title: 'leave',
            content: 'can we leave'
        })

        const note9 = await Note.create({
            title: 'work',
            content: 'work again'
        })

        const note10 = await Note.create({
            title: 'this really good',
            content: 'really good'
        })

        const note11 = await Note.create({
            title: 'finshed',
            content: 'are we finsished yet'
        })

        const note12 = await Note.create({
            title: 'have lunch',
            content: 'can we have lunch'
        })

        const note13 = await Note.create({
            title: 'cook',
            content: 'cook again'
        })

        const note14 = await Note.create({
            title: 'this is salty',
            content: 'really salty'
        })

        const note15 = await Note.create({
            title: 'going',
            content: 'are we going there'
        })

        const note16 = await Note.create({
            title: 'go home',
            content: 'can we go home'
        })
        
        await folder1.setUser(user1)
        await folder2.setUser(user1)
        await folder3.setUser(user1)
        await folder4.setUser(user1)
        await folder5.setUser(user2)
        await folder6.setUser(user2)
        await folder7.setUser(user2)
        await folder8.setUser(user2)
        await folder9.setUser(user3)
        await folder10.setUser(user3)
        await folder11.setUser(user3)
        await folder12.setUser(user3)
        await folder13.setUser(user4)
        await folder14.setUser(user4)
        await folder15.setUser(user4)
        await folder16.setUser(user4)

        await note1.setFolder(folder1)
        await note2.setFolder(folder2)
        await note3.setFolder(folder3)
        await note4.setFolder(folder4)
        await note5.setFolder(folder5)
        await note6.setFolder(folder6)
        await note7.setFolder(folder7)
        await note8.setFolder(folder8)
        await note9.setFolder(folder9)
        await note10.setFolder(folder10)
        await note11.setFolder(folder11)
        await note12.setFolder(folder12)
        await note13.setFolder(folder13)
        await note14.setFolder(folder14)
        await note15.setFolder(folder15)
        await note16.setFolder(folder16)

        await note1.setUser(user1)
        await note2.setUser(user1)
        await note3.setUser(user1)
        await note4.setUser(user1)
        await note5.setUser(user2)
        await note6.setUser(user2)
        await note7.setUser(user2)
        await note8.setUser(user2)
        await note9.setUser(user3)
        await note10.setUser(user3)
        await note11.setUser(user3)
        await note12.setUser(user3)
        await note13.setUser(user4)
        await note14.setUser(user4)
        await note15.setUser(user4)
        await note16.setUser(user4)
        
    }
    catch(err) {
        console.log('error making seeds')
        throw err
    }
}

const run = async () => {
    try {
        await seedDb()
    }
    catch(err) {
        console.log('error running seeds')
        throw err
    }
    finally {
        await process.exit()
    }
}

run()
const express =require('express')
const connection = require('./db')
const getAllHotels = (req, res) => {
    connection.query('SELECT * FROM tasks', (err, result) => {
        if (!err) res.json(result)
        else console.log("Error")
    })
}

const getAllLicences = (req, res) => {
    connection.query('SELECT * FROM categories', (err, result) => {
        if (!err) res.json(result)
        else console.log("Error")
    })
}

const addLicence = (req,res) =>{
    const {category_name, textArea,image } = req.body

    connection.query(`INSERT INTO categories SET ?`,
        { category_name: category_name, text: textArea,image:image}, (err, rows) => {
            if(rows)res.send({ message: 'Category added'} )
            else {
                console.log(err)
            }
        }
    )
}

const deleteLicence =  (req,res) =>{
    const {category_name} =req.body
    connection.query(`SELECT * FROM categories WHERE category_name = ?`,[category_name], (err,rows) =>{
        if(rows.length==0)res.json({message : "Requested category does not exist"})
        else{
            connection.query(`DELETE FROM categories WHERE category_name = ?`,[category_name], (err,rows)=>{
                if(rows)res.send({message : 'Category deleted'})
                else {
                    console.log(err);
                    res.send({message : "This category cannot be deleted beacuse it is used by a task, delete task first."})
                }
            })
        }
    })
}

const updateLicence = (req,res) =>{
    const {id, category_name, textArea}= req.body
    connection.query(`SELECT * FROM categories WHERE id = ?`,[id],(err,rows) =>{
        if(rows.length==0)res.json({message : "Requested category does not exist"})
        else{
            const sql = 'UPDATE categories SET category_name = ?, text = ? WHERE id =  ?';
            connection.query(sql,[category_name,textArea,id], (err,rows) =>{
                if(rows)res.json({message : "Category updated"});
                else {
                    console.log(err);
                }
            })
        }
    })
}

const addHotel = (req,res) =>{
    const { task_name, category_name} = req.body
    connection.query(`INSERT INTO tasks SET ?`,
        { name: task_name, category_name: category_name, date: new Date().toISOString() }, (err, rows) => {
            if(rows)res.send({ message: 'Task created' } )
            else {
                res.send({message :'Invalid category name'});
                console.log(err);
            }
        }
    )
}

const deleteHotel =  (req,res) =>{
    const {task_name} =req.body
    connection.query(`SELECT * FROM tasks WHERE name = ?`,[task_name], (err,rows) =>{
        if(rows.length==0)res.json({message : "Requested task does not exist"})
        else{
            connection.query(`DELETE FROM tasks WHERE name = ?`,[task_name], (err,rows)=>{
                if(rows)res.send({message : 'Task deleted'})
                else {
                    res.send({message : 'Invalid name'})
                    console.log(err);
                }

            })
        }
    })
}

const updateHotel = (req,res) =>{
    console.log(req.body)
    const {id,task_name, category_name}= req.body
    connection.query(`SELECT * FROM tasks WHERE id = ?`,[id],(err,rows) =>{
        if(rows.length==0)res.json({message : "Requested task does not exist"})
        else{
            const sql = 'UPDATE tasks SET name = ?, category_name = ? WHERE id =  ?';
            connection.query(sql,[task_name,category_name,id], (err,rows) =>{
                if(rows)res.json({message : "Task updated"});
                else {
                    console.log(err);
                    res.json({message : "Invalid ID"});
                }
            })
        }
    })
}

module.exports= {getAllHotels,getAllLicences,addLicence,deleteLicence,updateLicence,addHotel,deleteHotel,updateHotel}
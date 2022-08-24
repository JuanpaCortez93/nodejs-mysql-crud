const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer',(err,customers)=>{
            if(err){
                res.json(err);
            }
            console.log(customers);
            res.render('customers',{
                data:customers
            })

        })
    });
}

controller.add = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO customer SET ?', [data], (err,rows) => {
            res.redirect('/');
        })
    })
}

controller.edit = (req,res) => {
    const id = req.params.id;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err,rows)=>{
            res.render('customer_edit',{
                data: rows[0]
            })
        });
    });
}

controller.update = (req,res) => {
    const id = req.params.id;
    const newCostumer = req.body;
    req.getConnection((err,conn)=>{
        conn.query("UPDATE customer set ? WHERE id = ?", [newCostumer, id], (err,rows)=>{
            res.redirect('/');
        })
    })
}

controller.delete = (req,res) => {
    const id = req.params.id;
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err,rows)=>{
            res.redirect('/');
        })
    })
}

module.exports = controller;
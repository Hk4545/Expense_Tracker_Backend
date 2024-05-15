const routes = require('express').Router();
const schema = require('./schema');

routes.route('/api/transaction')
    .post(async (req, res) => {
        try {
            if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
            let { name, type, amount } = req.body;

            const temp = await schema.Transaction.create({
                name,
                type,
                amount,
                date: new Date()
            });

            return res.json(temp);
        } catch (err) {
            return res.status(400).json({ message: `Error while creating categories ${err}` });
        }
    })
    .get(async (req, res) => {
        try {
            let data = await schema.Transaction.find({});
            return res.json(data);
        } catch (err) {
            console.log(err)
        }
    })
routes.route("/api/delete_transaction/:id")
    .delete(async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!id) return res.status(400).json({ message: "ID not provided in the request parameters" });
    
            const result = await schema.Transaction.deleteOne({ _id: id });
    
            if (result.deletedCount === 1) {
                return res.json({ message: "Record deleted successfully" });
            } else {
                return res.json({ message: "Record not found or already deleted" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while deleting transaction record" });
        }
    })

routes.route("/api/update_transaction/:id")
    .put(async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID not provided in the request parameters" });
            }

            const { name, type, amount } = req.body;

            const updatedRecord = await schema.Transaction.findByIdAndUpdate(
                id,
                { name, type, amount, date: Date.now() },
                { new: true }
            );

            if (updatedRecord) {
                return res.json({ message: "Record updated successfully", updatedRecord });
            } else {
                return res.json({ message: "Record not found or already deleted" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while updating transaction record" });
        }
    });

    
    


module.exports = routes;
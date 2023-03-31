import createHandler from "../../../database";
import Expenses from "../../../models/Expenses";

const handler = createHandler();
handler.post(async (req: any, res: any) => {
  console.log(req.body);
  const user = await new Expenses(req.body);
  console.log(user);
  user
    .save()
    .then((result: any) => {
      res.status(201).json({ message: "User created", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ message: "Something went wrong", record: err });
    });
});
handler.delete(async (req: any, res: any) => {
  console.log(req.query.id);
  Expenses.deleteOne({ _id: req.query.id })
    .then((result: any) => {
      res.status(202).json({ message: "User created", record: result });
    })
    .catch((err: any) => {
      res.status(404).json({ message: "Something went wrong", record: err });
    });
});
handler.get(async (req: any, res: any) => {
  Expenses.find({})
    .then((result: any) => {
      res.status(202).json({ message: "Data founded", record: result });
    })
    .catch((err: any) => {
      res.status(404).json({ message: "data  not found", record: err });
    });
});
handler.put(async (req: any, res: any) => {
  console.log(req.body);

  Expenses.updateOne(
    { date1: req.body.date1 },
    { $push: { expense: req.body.expense } }
  )
    .then((result: any) => {
      res.status(200).json({ message: "data update ", record: result });
    })
    .catch((err: any) => {
      err.status(404).json({ message: "error", record: err });
    });
});
export default handler;

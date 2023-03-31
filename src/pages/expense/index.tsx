import React, {Fragment, useState } from "react";
import { SiPivotaltracker } from "react-icons/Si";
import { GrAddCircle } from "react-icons/Gr";
import axios from "axios";
import { useRouter } from "next/router";
import dbConnect, { Jsonify } from "database/database";
import Expenses from "models/Expenses";
import { Input, Accordion,
    AccordionHeader,
    AccordionBody, } from "@material-tailwind/react";
import mongoose from "mongoose";
export async function getServerSideProps() {
 dbConnect()
  
  const user = await Expenses.find({});

  return {
    props: {
      user: Jsonify(user),
    },
  };
}

function Icon({ id, open }:any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
    }  

export default function Index({ user }: any) {
  const [sum, Setsum] = useState(0);
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value:any) => {
    setOpen(open == value ? 0 : value);
  };

  const [data, setData] = useState<any>({
    expense: {
      name: "",
      amount: "",
    },
    date1: "",
  });

  const router = useRouter();
  console.log(user);

  const handleSubmit = (values: any, user: any) => {
    

    {
      if (user.filter((ele: any) => ele.date1 == values.date1).length!=0) {
        console.log("put")
        axios
          .put(`/api/expense`, values)
          .then((res) => {
            router.reload();
          })
          .catch((err) => console.log(err));
      } else {
        console.log("post")
        axios
          .post(`/api/expense`, values)
          .then((res) => {
            router.reload();
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <>
      <div className="">
        <div className="flex justify-center font-bold text-4xl py-6  text-gray-700">
          <i className="mt-3 px-5 text-red-400">
            <SiPivotaltracker />
          </i>
          <p className="bg-gradient-to-r from-red-700 via-gray-500 to-gray-300 inline-block text-transparent bg-clip-text">
            Expenses Tracker
          </p>
        </div>

        <div className="flex flex-col  items-center ">
          <div className="input-group w-1/2 input-group-dynamic mt-4">
            <label htmlFor="">Name OF Expense</label>
            <input
              type="text"
              className="form-control"
              placeholder="Expense name"
              value={data.expense.name}
              onChange={(e) =>
                setData({
                  expense: {
                    name: e.target.value,
                    amount: data.expense.amount,
                  },
                  date1: data.date1,
                })
              }
            />
          </div>

          <div className="input-group w-1/2 input-group-dynamic mt-4">
            <label htmlFor="">Amount</label>
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              value={data.expense.amount}
              onChange={(e) =>
                setData({
                  expense: {
                    name: data.expense.name,
                    amount: e.target.value,
                  },
                  date1: data.date1,
                })
              }
            />
          </div>

          <div className="input-group w-1/2 input-group-dynamic mt-4">
            <label htmlFor="">Date</label>
            <input
              type="date"
              className="form-control"
              value={data.date1}
              onChange={(e) =>
                setData({
                  expense: {
                    name: data.expense.name,
                    amount: data.expense.amount,
                  },
                  date1: e.target.value,
                })
              }
            />
          </div>
          <button
            className="  button button-gradient button-red font-bold text-sm mt-4 w-32 hover:button-dark"
            data-ripple-light="true"
            onClick={() => handleSubmit(data, user)}
          >
       
            Add
          </button>
        </div>

        { 
        user.map((ele: any) => {
             let a=0;
          return (
            <>
        <Fragment>
      <Accordion open={open === ele.date1} icon={<Icon id={ele.date1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(ele.date1)}>
        <div className="flex justify-between">
                <button
                  className="button button-gradient button-dark flex mx-20 mt-5 "
                  data-ripple-light="true"
                >
                  {ele.date1}
                </button>
             
               
               
              </div>
        </AccordionHeader>
        <AccordionBody>
        <div className="flex justify-between  py-4">
                <h4 className="text-gray-700  text-2xl mx-20 font-bold ">
                  Name of Expense
                </h4>

                <h4 className="text-gray-700  text-2xl mx-20 font-bold">
                  Amount
                </h4>
              </div>
              {ele.expense.map((exp: any) => {
                a+=exp.amount;
                return (
                  <>
                    <div key={ele} className="flex justify-between mt-2 ">
                      <h4 className="text-gray-700 mx-20 text-center text-xl font-bold capitalize">
                        {exp.name}
                      </h4>
                      <h4 className="text-red-700 text-center    mx-20 text-lg   ">
                        {exp.amount} Rs/-{" "}
                      </h4>
                      
                    </div>
                  </>
                );
              })}
              <div className="flex justify-end">
                 <button
                  className="button button-gradient button-green text-sm   mx-10 mt-5 "
                  data-ripple-light="true"
                >
               Total :  {a}
                </button>
                </div>
        </AccordionBody>
      </Accordion>
      </Fragment>
      </>
          );
        })}
      </div>
    </>
  );
}

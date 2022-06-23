// import { useState } from "react"

// import * as React from 'react';
// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Box from '@mui/material/Box';
// import FormHelperText from '@mui/material/FormHelperText';
// import { Button, Grid, TextField } from "@mui/material";

// function AddRemoveMultipleInputFields() {

//     const [inputFields, setInputFields] = useState<any>([{
//         fullName: '',
//         emailAddress: '',
//         salary: ''
//     }]);

//     const addInputField = () => {

//         setInputFields([...inputFields, {
//             fullName: '',
//             emailAddress: '',
//             salary: ''
//         }])

//     }
//     const removeInputFields = (index: any) => {
//         const rows = [...inputFields];
//         rows.splice(index, 1);
//         setInputFields(rows);
//     }
//     const handleChange = (index: any, evnt: any) => {

//         const { name, value } = evnt.target;
//         const list = [...inputFields];
//         list[index][name] = value;
//         setInputFields(list);



//     }
//     return (

//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-8">
//                     {
//                         inputFields.map((data: any, index: any) => {
//                             const { fullName, emailAddress, salary } = data;
//                             return (
//                                 <div className="row my-3" key={index}>
//                                     <div className="col">
//                                         <div className="form-group">
//                                             <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={fullName} name="fullName" className="form-control" placeholder="Full Name" />
//                                         </div>
//                                     </div>
//                                     <div className="col">
//                                         <input type="email" onChange={(evnt) => handleChange(index, evnt)} value={emailAddress} name="emailAddress" className="form-control" placeholder="Email Address" />
//                                     </div>
//                                     <div className="col">
//                                         <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={salary} name="salary" className="form-control" placeholder="Salary" />
//                                     </div>
//                                     <div className="col">



//                                         {(inputFields.length !== 1) ? <button className="btn btn-outline-danger" onClick={removeInputFields}>Remove</button> : ''}


//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }

//                     <div className="row">
//                         <div className="col-sm-12">

//                             <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-sm-4">

//             </div>
//         </div>

//     )
// }
// export default AddRemoveMultipleInputFields





// export function BasicTextFields() {

//     const [inputFields, setInputFields] = useState<any>([{
//         name: '',
//         price: '',

//     }]);

//     const addInputField = () => {

//         setInputFields([...inputFields, {
//             fullName: '',
//             emailAddress: '',
//             salary: ''
//         }])

//     }
//     const removeInputFields = (index: any) => {
//         const rows = [...inputFields];
//         rows.splice(index, 1);
//         setInputFields(rows);
//     }
//     const handleChange = (index: any, evnt: any) => {

//         const { name, value } = evnt.target;
//         const list = [...inputFields];
//         list[index][name] = value;
//         setInputFields(list);
//     }
//     { console.log("inputFields", inputFields) }
//     return (
//         inputFields.map((data: any, index: any) => {
//             const { name, price } = data;
//             return (
//                <>
//                     <FormControl>

//                         <Grid item xs={12} sm={6}>
//                         <TextField
//                             helperText=" "
//                             id="demo-helper-text-aligned-no-helper"
//                             label="Name"
//                             onChange={(evnt) => handleChange(index, evnt)}
//                             value={name}
//                             name="name"

//                         /> 
//                         </Grid>
//                         <Grid item xs={12}  >
//                         <TextField
//                             helperText=" "
//                             id="demo-helper-text-aligned-no-helper"
//                             label="Price"
//                             onChange={(evnt) => handleChange(index, evnt)}
//                             value={price}
//                             name="price"

//                         />
//                         </Grid>
//                         <Button onClick={removeInputFields}> remove</Button>
//                         <Button onClick={addInputField}> add new</Button>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             save
//                         </Button>
//                     </FormControl>
//                 </>


//             )
//         }))
// }


import { useState } from "react";

export function BasicTextFields() {
    const [listInput, setListInput] = useState<any>([
        { fName: "", lName: "", },
        { fName: "", lName: "", }
    ]);

    const handleChange = (e: any, index: any) => {
        const { name, value } = e.target;

        const list = [...listInput];

        list[index][name] = value;

        list[index][e.target.getAttribute("data-error-name")] =
            value.length < 1 ? "Field is required" : null;

        setListInput(list);
    };

    const handleAddInput = () =>
        setListInput([
            ...listInput,
            { fName: "", lName: "" }
        ]);

    const handleRemoveInput = (index: any) => {
        const list = [...listInput];

        list.splice(index, 1);

        setListInput(list);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    {listInput.map((item: any, index: any) => (
                        <div className="row" key={index}>
                            <div className="col">
                                <div className={`form-group  `}>
                                    <input
                                        type="text"
                                        className={`form-control  }`}
                                        name="fName"
                                        data-error-name="errFName"
                                        placeholder="First name"
                                        value={item.fName}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                    {item.errFName && (
                                        <div className="invalid-feedback">{item.errFName}</div>
                                    )}
                                </div>
                            </div>
                            <div className="col">
                                <div className={`form-group `}>
                                    <input
                                        type="text"
                                        className={`form-control  `}
                                        name="lName"
                                        placeholder="Last name"
                                        data-error-name="errLName"
                                        value={item.lName}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                    {item.errLName && (
                                        <div className="invalid-feedback">{item.errLName}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col">
                                {listInput.length !== 1 && (
                                    <button
                                        className="btn btn-danger btn-sm mx-1"
                                        onClick={() => handleRemoveInput(index)}
                                    >
                                        Remove
                                    </button>
                                )}

                                {listInput.length - 1 === index && (
                                    <button
                                        className="btn btn-primary btn-sm mx-1"
                                        onClick={handleAddInput}
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}

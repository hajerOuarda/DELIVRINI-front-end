import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { InputLabel, MenuItem, Select } from '@mui/material';
import { DiningOutlined, FoodBankOutlined } from '@mui/icons-material';

const theme = createTheme();

export default function CreateRestaurantDialog() {
    const [values, setValues] = React.useState({});

    const initialValues = {
        RestaurantName: "",
        address: "",
        phone: "",
        zipCode: "",
        street: "",
        email: "",

    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("invalid email")
            .required("This field is required!"),
        password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("This field is required!"),
        firstName: Yup.string().required("This field is required!"),
        lastName: Yup.string().required("This field is required!"),
        address: Yup.string().required("This field is required!"),
        phone: Yup.string().required("This field is required!"),
    });

    const handleChange = (event: any) => {
        setValues(prevValues => ({
            ...prevValues,
            // we use the name to tell Formik which key of `values` to update
            [event.target.name]: event.target.value

        }))
    }
    // const handleSubmit = (restaurantName: string,    address: string,    phone: string,    zipCode: string,  street: string,    email: string) => {
    // call createrestoAction
    const handleSubmit = (values: any) => {
        console.log("values", values);

    }
    { console.log("phone", values) }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginBottom: 2, marginTop: 0 }}>
                                <FoodBankOutlined />
                            </Avatar>

                            <Form >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            autoComplete="RestaurantName"
                                            name="RestaurantName"
                                            required
                                            fullWidth
                                            id="RestaurantName"
                                            label="Restaurant Name"
                                            autoFocus

                                            error={errors.RestaurantName && touched.RestaurantName}
                                        />
                                        <ErrorMessage
                                            name="RestaurantName"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            autoComplete="phone"

                                            error={errors.phone && touched.phone}
                                        />

                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="zipCode"
                                            label="Zip Code"
                                            name="zipCode"
                                            autoComplete="zipCode"

                                            error={errors.zipCode && touched.zipCode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="street"
                                            label="Street"
                                            name="street"
                                            autoComplete="street"

                                            error={errors.street && touched.street}
                                        />

                                    </Grid>
                                    <Grid item xs={12}  >
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="address"
                                            label="address"
                                            name="address"
                                            autoComplete="address"

                                            error={errors.address && touched.address}
                                        />
                                        <ErrorMessage
                                            name="address"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            error={errors.email && touched.email}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Create Restaurant
                                </Button>

                            </Form>
                        </Box>

                    </Container>

                </ThemeProvider>
            )}
        </Formik>
    )
}
// export function CreateRestaurantDialog() {

//     return (<label> are you sure you want to delete this item  </label>)
// }
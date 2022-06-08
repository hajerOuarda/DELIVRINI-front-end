import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { FoodBankOutlined } from '@mui/icons-material';
import { createRestaurantAction } from '../../store/actions/restaurantAction';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSnackbar } from '../../store/reducers/customizedSnackBarReducer';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const theme = createTheme();

export default function CreateRestaurantDialog() {
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState("fast food");
    const categories = ["vegan", "fast food", "chinese"];

    const initialValues = {
        name: "",
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
        name: Yup.string().required("This field is required!"),
        zipCode: Yup.string().required("This field is required!"),
        address: Yup.string().required("This field is required!"),
        phone: Yup.string().required("This field is required!"),
    });
    const handleChange = (e: any) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
    }

    const handleSubmit = (formValue: { name: string, address: string, phone: string, zipCode: string, street: string, email: string }) => {

        dispatch<any>(createRestaurantAction({ ...formValue }, category))

    }
    console.log("category", category);

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
                                            autoComplete="name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Restaurant Name"
                                            autoFocus
                                            error={errors.name && touched.name}
                                        />
                                        <ErrorMessage
                                            name="name"
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
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-label">Restaurant category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="category"
                                            required
                                            name="category"
                                            label="category"
                                            autoWidth
                                            displayEmpty
                                            onChange={handleChange}
                                            value={category}
                                        >
                                            {categories.map((category, index) => (
                                                <MenuItem value={category} key={index}> {category}</MenuItem>
                                            ))}
                                        </Select>
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

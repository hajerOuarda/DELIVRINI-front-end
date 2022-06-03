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
import { useAppDispatch } from '../../store/hooks';
import { editRestaurantAction, formikV } from '../../store/actions/restaurantAction';
import { restaurantService } from '../../store/services/restaurantService';
import { useEffect, useState } from 'react';

const theme = createTheme();

export default function CreateRestaurantDialog(props: any) {
    const dispatch = useAppDispatch();
    const [resto, setResto] = useState<formikV>()
    useEffect(() => {

        restaurantService.findRestaurantById(props.idRestaurant).then((r) => {
            setResto(r.restaurant_found)
        }).catch((e: any) => console.log(e.message))
    }, [])

    console.log(resto)
    console.log(resto?.name)
    const initialValues = {
        name: resto?.name ?? '',
        address: resto?.address ?? '',
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
        street: Yup.string().required("This field is required!"),
    });

    const handleSubmit = (formValue: { name: string, address: string, phone: string, zipCode: string, street: string, email: string }) => {

        // dispatch<any>(editRestaurantAction(formValue, 5))

    }

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
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Edit Restaurant
                                </Button>
                            </Form>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </Formik>
    )
}

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

const theme = createTheme();

export default function CreateRestaurantDialog() {
    const dispatch = useAppDispatch();
    const restaurantStatu = useAppSelector((state) => state.RestaurantReducer.statu);


    const initialValues = {
        restaurantName: "",
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
        restaurantName: Yup.string().required("This field is required!"),
        zipCode: Yup.string().required("This field is required!"),
        address: Yup.string().required("This field is required!"),
        phone: Yup.string().required("This field is required!"),
    });

    const handleSubmit = (formValue: { restaurantName: string, address: string, phone: string, zipCode: string, street: string, email: string }) => {
        console.log("test create ");
        dispatch<any>(createRestaurantAction(formValue))
    }
    
    console.log("res statu ", restaurantStatu)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit
            }
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
                                            autoComplete="restaurantName"
                                            name="restaurantName"
                                            required
                                            fullWidth
                                            id="restaurantName"
                                            label="Restaurant Name"
                                            autoFocus
                                            error={errors.restaurantName && touched.restaurantName}
                                        />
                                        <ErrorMessage
                                            name="restaurantName"
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

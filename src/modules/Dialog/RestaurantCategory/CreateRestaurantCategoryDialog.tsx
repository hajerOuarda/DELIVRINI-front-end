import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { FoodBankOutlined } from '@mui/icons-material';
import { useAppDispatch } from '../../../store/hooks';
import { createRestaurantCategoryAction, formikRestaurantCategory } from '../../../store/actions/restaurantCategoryAction';
const theme = createTheme();

export default function CreateRestaurantCategoryDialog() {
    const dispatch = useAppDispatch();

    const initialValues = {
        name: "",
        description: "",
        image: "",
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field is required!"),
        description: Yup.string().required("This field is required!"),
    });


    const handleSubmit = (formValue: formikRestaurantCategory) => {
        dispatch<any>(createRestaurantCategoryAction(formValue))
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
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            autoComplete="name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Restaurant Category Name"
                                            autoFocus
                                            error={errors.name && touched.name}
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>

                                    <Grid item xs={12} >
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            name="description"
                                            autoComplete="description"
                                            error={errors.description && touched.description}
                                        />

                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="image"
                                            label="Image"
                                            name="image"
                                            autoComplete="image"
                                            error={errors.image && touched.image}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Create Restaurant Category
                                </Button>
                            </Form>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </Formik>
    )
}

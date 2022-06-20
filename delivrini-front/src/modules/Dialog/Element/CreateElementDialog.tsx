import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { FoodBankOutlined } from '@mui/icons-material';
import { createTheme, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createElementAction, formikElement } from '../../../store/actions/elementAction';
import { useState } from 'react';

const theme = createTheme();

export default function CreateElementDialog() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.authReducer.userInfo.fk_restaurant);
    const mealcategories = useAppSelector((state) => state.MealCategoryReducer.mealCategoryInfo)
    const [mealcategory, setMealCategory] = useState<any>(mealcategories[0].name)
    const initialValues = {
        name: "",
        description: "",
        price: "",
        image: "",
        fk_Mealcategory: ""
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field is required!"),
        price: Yup.string().required("This field is required!"),
        image: Yup.string().required("This field is required!"),
        description: Yup.string().required("This field is required!"),
    });
    const handleChange = (e: any) => {
        const selectedMealCategory = e.target.value;
        setMealCategory(selectedMealCategory)

        console.log("change", selectedMealCategory);

    }

    const handleSubmit = (formValue: formikElement) => {
        formValue.fk_Mealcategory = mealcategory;
        dispatch<any>(createElementAction(formValue, restaurant))
        console.log("create element values ", formValue);

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
                                            label=" Element Name"
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
                                    <Grid item xs={12} >
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="price"
                                            label="Price"
                                            name="price"
                                            autoComplete="price"
                                            error={errors.price && touched.price}
                                        />

                                        <ErrorMessage
                                            name="price"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-label">Meal Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="fk_Mealcategory"
                                            required
                                            name="fk_Mealcategory"
                                            label="mealcategory"
                                            autoWidth
                                            displayEmpty
                                            onChange={handleChange}
                                            // renderValue={val => <MenuItem>{val ?? 'unknown category'} </MenuItem>}
                                            value={mealcategory}
                                        >{mealcategories.map((category: any, index: any) => (
                                            <MenuItem value={category.name} key={index}> {category.name}</MenuItem>
                                        ))}
                                        </Select>
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
                                    <Grid item xs={12} >
                                        <Button variant="outlined"> add ingredients </Button>
                                        <Button variant="outlined"> add Extras </Button> </Grid>

                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Create  Element
                                </Button>
                            </Form>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </Formik>
    )
}

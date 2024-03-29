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
import { createTheme, Input, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createElementAction, formikElement } from '../../../store/actions/elementAction';
import { useState } from 'react';

const theme = createTheme();

export default function CreateElementDialog() {
    const dispatch = useAppDispatch();
    const restaurant = useAppSelector((state) => state.authReducer.userInfo.fk_restaurant);
    const mealcategories = useAppSelector((state) => state.MealCategoryReducer.mealCategoryInfo)
    const [mealcategory, setMealCategory] = useState<any>(mealcategories[0].name)
    const [selectedImage, setSelectedImage] = useState<any>([]);
    //** ingredients */
    const [ingredients, setIngredients] = useState<any>([
        { ingredientName: "" },
    ]);
    //** extras */
    const [listExtras, setListExtras] = useState<any>([
        { extrasName: "", extrasPrice: "" },

    ]);

    const initialValues = {
        name: "",
        description: "",
        price: "",
        image: "",
        fk_Mealcategory: "",
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field is required!"),
        price: Yup.string().required("This field is required!"),


    });
    const handleChange = (e: any) => {
        const selectedMealCategory = e.target.value;
        setMealCategory(selectedMealCategory)

    }

    const handleSubmit = (formValue: formikElement) => {
        formValue.fk_Mealcategory = mealcategory;
        dispatch<any>(createElementAction(formValue, restaurant, ingredients, listExtras))

        console.log("create element values ", formValue);
        console.log("Ingredients", ingredients)
        console.log("extra list", listExtras);
        console.log("file", selectedImage);
    }

    function onImageChange(e: any) {
        setSelectedImage([...selectedImage, URL.createObjectURL(e.target.files[0])]);
        console.log("file", selectedImage);
    }

    /** Extras */
    const handleChangeExtras = (e: any, index: any) => {
        const { name, value } = e.target;
        const list = [...listExtras];
        list[index][name] = value;
        setListExtras(list);
    };

    const handleAddExtras = () => {
        setListExtras([
            ...listExtras,
            { extrasName: "", extrasPrice: "" }
        ]);
    }

    const handleRemoveInput = (index: any) => {
        const list = [...listExtras];
        list.splice(index, 1);
        setListExtras(list);
    };
    /** Ingredients */
    const handleChangeIngredients = (e: any, index: any) => {
        const { name, value } = e.target;
        const list = [...ingredients];
        list[index][name] = value;
        setIngredients(list);
    };

    const handleAddIngredients = () => {
        setIngredients([
            ...ingredients,
            { ingredientName: "" }
        ]);
    }

    const handleRemoveIngredients = (index: any) => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
    };

    console.log("Ingredients from parent component", ingredients)
    console.log("listExtras ", listExtras)


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
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12} >
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            name="description"
                                            autoComplete="description"
                                        />

                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </Grid>

                                    <Grid item xs={12}  >
                                        <InputLabel id="demo-simple-select-label" >Meal Category</InputLabel>
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
                                    <Grid item xs={12}  >

                                        <Input type="file" id="image" name="image" onChange={() => onImageChange} />

                                        {/* <Field
 
                                            id="image"
                                            label="Image"
                                            name="image"
                                            autoComplete="image"
                                            type="file" multiple accept="image/*" onChange={onImageChange}
                                            error={errors.image && touched.image}
                                        /> */}
                                    </Grid>

                                    <Grid item   >
                                        {ingredients.map((item: any, index: any) => (

                                            <Grid item xs={12} sm={6}  >
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    id="ingredientName"
                                                    label="Ingredients"
                                                    name="ingredientName"
                                                    autoComplete="ingredientName"
                                                    value={item.ingredientName}
                                                    key={item.index}
                                                    onChange={(e: any) => handleChangeIngredients(e, index)} />

                                                {index ? <Button variant="outlined" onClick={() => handleRemoveIngredients(index)}> Remove </Button> : null}
                                                <Button variant="outlined" onClick={() => handleAddIngredients()}>  Add</Button>
                                            </Grid>


                                        ))}
                                    </Grid>

                                    {listExtras.map((item: any, index: any) => (
                                        <>
                                            <Grid item xs={6}   >
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    id="extrasName"
                                                    label="extras Name"
                                                    name="extrasName"
                                                    autoComplete="extrasName"
                                                    value={item.extrasName}
                                                    key={index}
                                                    onChange={(e: any) => handleChangeExtras(e, index)} />
                                            </Grid>
                                            <Grid item xs={6}   >
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    id="extrasPrice"
                                                    label="extras Price"
                                                    name="extrasPrice"
                                                    autoComplete="extrasPrice"
                                                    value={item.extrasPrice}
                                                    key={item.index}
                                                    onChange={(e: any) => handleChangeExtras(e, index)} />

                                                {index ? <Button variant="outlined" onClick={() => handleRemoveInput(index)}> Remove </Button> : null}
                                                <Button variant="outlined" onClick={() => handleAddExtras()}>  Add</Button>
                                            </Grid>
                                        </>

                                    ))}

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
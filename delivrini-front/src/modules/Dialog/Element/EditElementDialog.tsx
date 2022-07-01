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
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { editElementAction, formikElement } from '../../../store/actions/elementAction';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { elementService } from '../../../store/services/elementService';
import ChipInputIngredients from '../../Ingredients/ChipInputIngredients';
 import { listIngredientsAction } from '../../../store/actions/ingredientsAction';
const theme = createTheme();

export default function EditElementDialog(props: any) {
    const dispatch = useAppDispatch();
    const [element, setElement] = useState<formikElement>();
    const idElement = props.idElement;
    const mealcategories = useAppSelector((state) => state.MealCategoryReducer.mealCategoryInfo)
    const [mealcategory, setMealCategory] = useState<any>(mealcategories[0].name)
    const listIngredients = useAppSelector((state) => state.IngredientsReducer.ingredientsInfo)


    //** ingredients */
    let [ingredients, setIngredients] = useState<any>([]);

    //** extras */
    const [listExtras, setListInput] = useState<any>([
        { extrasName: "", extrasPrice: "", id: new Date().getTime() },
    ]);
 

    useEffect(() => {
        elementService.findElementById(idElement).then((element) => {
            setElement(element.element_found)
            console.log("element useeffect", element.element_found);
            dispatch<any>(listIngredientsAction(element.element_found?.name));
        }).catch((e: any) => console.log(e.message))

    }, [])


    const initialValues = element ?? {
        name: '',
        description: '',
        price: '',
        image: '',
        fk_Mealcategory: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field is required!"),
        description: Yup.string().required("This field is required!"),
        price: Yup.string().required("This field is required!"),
        image: Yup.string().required("This field is required!"),
    });
    const handleChange = (e: any) => {
        const selectedMealCategory = e.target.value;
        setMealCategory(selectedMealCategory)
    }
    const handleSubmit = (formValue: formikElement) => {
        formValue.fk_Mealcategory = mealcategory;
        dispatch<any>(editElementAction(formValue, idElement, ingredients, listExtras))
        console.log('values', formValue)
    }

    const handleChangeExtras = (e: any, index: any) => {
        const { name, value } = e.target;
        const list = [...listExtras];
        list[index][name] = value;
        setListInput(list);
    };

    const handleAddExtras = () => {
        setListInput([
            ...listExtras,
            { extrasName: "", extrasPrice: "", id: new Date().getTime() }
        ]);
    }
    const handleRemoveInput = (index: any) => {
        const list = [...listExtras];

        list.splice(index, 1);

        setListInput(list);
    };
    console.log("Ingredients from parent component", ingredients)


    return (
        !element ? null : <Formik
            initialValues={element ?? initialValues}
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
                                    <Grid item xs={12}  >
                                        <Field
                                            as={TextField}
                                            autoComplete="name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Element name"
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
                                    <Grid item xs={12}  >
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
                                            // renderValue={val => <MenuItem>{val ?? 'Choose Meal category'} </MenuItem>}
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
                                            label="image"
                                            name="image"
                                            autoComplete="image"
                                            error={errors.image && touched.image}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <ChipInputIngredients ingredients={ingredients} setIngredients={setIngredients} />
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
                                                    key={item.id}
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
                                    Edit Element
                                </Button>
                            </Form>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </Formik>
    )
}

import { profileSchema } from './schema'
import { useForm } from './form/use-form'

export default function App() {
	const defaultValues = profileSchema.getDefault();
	const { Form } = useForm({
		schema: profileSchema,
		defaultValues,
		onSubmit: (values) => {
			console.log(values);
		},
		onInvalidError: (errors) => {
			console.log(errors);
		},
		isMutating: false,
	});

	// console.log({formValues});

	return (
		<div className="App">
			<Form>
				<Form.Field.Text label="Name" name="name" />
				<Form.Field.Select label="Type" name="type" options={[{
					label: "Admin",
					value: "admin",
				}, {
					label: "User",
					value: "user",
				}]} />
			  <Form.Button.Submit label="Submit" />
			</Form>
		</div>
	);
}

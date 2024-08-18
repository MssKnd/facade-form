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

	return (
		<div className="App">
			<Form>
			  <Form.Field.Text label="Name" name="name" />
			  <Form.Button.Submit label="Submit" />
			</Form>
		</div>
	);
}

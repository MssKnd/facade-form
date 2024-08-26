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
				<Form.Body>
					<Form.Field.Text label="Name" name="name" required />
					<Form.Field.Text label="Nickame" name="nickname" />
					<Form.Field.Select label="Type" name="type" options={USER_TYPE_OPTIONS} />
					<Form.ArrayField.Text label="Tags" name="tags" />
					<Form.Guard value='aaaa' name="name" >
						test
					</Form.Guard>
				</Form.Body>
				<Form.Footer>
			  	<Form.Button.Submit label="Submit" />
				</Form.Footer>
			</Form>
		</div>
	);
}

const USER_TYPE_OPTIONS = [{
	label: "Admin",
	value: "admin",
}, {
	label: "User",
	value: "user",
}]

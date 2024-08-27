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
				<Form.Header />
				<Form.Body>
					<Form.Field.Text label="Name" name="name" required />
					<Form.Field.Text label="Nickame" name="nickname" />
					<Form.Field.Radio label="Type" name="type" options={USER_TYPE_OPTIONS} />
					<Form.Guard allowValue='admin' name="type" >
						Use this when you want to branch depending on the input value.
					</Form.Guard>
					<Form.Field.Select label="Language" name="language" options={LANGUAGE_TYPE_OPTIONS} />
					<Form.ArrayField.Text label="Tags" name="tags" defaultValue='' />
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

const LANGUAGE_TYPE_OPTIONS = [
	{
		label: "English",
		value: "en",
	},
	{
		label: "Japanese",
		value: "ja",
	},
]

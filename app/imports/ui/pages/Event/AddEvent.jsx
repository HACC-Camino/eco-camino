import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

/** Renders the Page for adding stuff. */
class AddStuff extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    // console.log('AddStuff.submit', data);
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    stuffDefineMethod.call({ name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
          // console.error(error.message);
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          // console.log('Success');
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Stuff</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <NumField name='quantity' decimal={false}/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStuff;

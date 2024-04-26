import { useSettings } from './useSettings';
import { useEditSetting } from './useEditSettings';

import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { editSetting, status } = useEditSetting();
  if (isLoading) return <Spinner />;

  function handleEditSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    editSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          defaultValue={minBookingLength}
          type='number'
          id='min-nights'
          disabled={status === 'pending'}
          onBlur={(e) => handleEditSetting(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          defaultValue={maxBookingLength}
          type='number'
          id='max-nights'
          disabled={status === 'pending'}
          onBlur={(e) => handleEditSetting(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          defaultValue={maxGuestsPerBooking}
          type='number'
          id='max-guests'
          disabled={status === 'pending'}
          onBlur={(e) => handleEditSetting(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          defaultValue={breakfastPrice}
          type='number'
          id='breakfast-price'
          disabled={status === 'pending'}
          onBlur={(e) => handleEditSetting(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

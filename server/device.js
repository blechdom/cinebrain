const validDeviceStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const deviceFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

function cleanupDevice(device) {
  const cleanedUpDevice = {};
  Object.keys(device).forEach(field => {
    if (deviceFieldType[field]) cleanedUpDevice[field] = device[field];
  });
  return cleanedUpDevice;
}

function convertDevice(device) {
  if (device.created) device.created = new Date(device.created);
  if (device.completionDate) device.completionDate = new Date(device.completionDate);
  return cleanupDevice(device);
}

function validateDevice(device) {
  const errors = [];
  Object.keys(deviceFieldType).forEach(field => {
    if (deviceFieldType[field] === 'required' && !device[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (!validDeviceStatus[device.status]) {
    errors.push(`${device.status} is not a valid status.`);
  }

  return (errors.length ? errors.join('; ') : null);
}

export default {
  validateDevice,
  cleanupDevice,
  convertDevice,
};

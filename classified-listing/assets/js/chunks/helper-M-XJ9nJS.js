const isChrome = /Chrome|CriOS/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const getGeneratedAddress = () => {
  let address = [];
  const items = {};
  const address_order = ["address", "sub_sub_location", "sub_location", "location", "zipcode"];
  const mapFields = document.querySelectorAll(".rtcl-map-field");
  if (mapFields.length) {
    for (let i = 0; i < mapFields.length; ++i) {
      const mapField = mapFields[i];
      if (mapField.offsetParent !== null) {
        const type = mapField.type;
        const attr_name = mapField.name;
        if ((type === "text" || type === "textarea") && mapField.value) {
          items[attr_name] = mapField.value;
        } else if (type === "select-one" && mapField.value && mapField.options[mapField.selectedIndex].innerText) {
          items[attr_name] = mapField.options[mapField.selectedIndex].innerText;
        }
      }
    }
  }
  address_order.map(function(value) {
    if (items[value] !== void 0) {
      address.push(items[value]);
    }
  });
  address = address.filter(function(v) {
    return v !== "";
  });
  address = address.join();
  return address;
};
const getListingMapData = () => {
  const data = [];
  const rtclLls = document.querySelectorAll(".rtcl-listing-item");
  if (rtclLls.length) {
    for (let i = 0; i < rtclLls.length; ++i) {
      const mapData = JSON.parse(rtclLls[i].getAttribute("data-options"));
      if (mapData) {
        data.push(mapData);
      }
    }
  }
  return data;
};
export {
  getListingMapData as a,
  getGeneratedAddress as g,
  isChrome as i
};

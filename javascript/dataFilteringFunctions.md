# Data Filtering Functions

It is best practice to reduce your payload outputs to be only exactly what is necessary for your project to work. Ellucian APIs (and others) return a lot of data, much of wish you may not want to return in the payload of your Pipeline.

These functions make it easier to filter (reduce) that payload data.

## keepObjectKeys( object: object , [key: string])

Takes the input object and returns a new oject with only the keys that were in the array.

## keepArrayKeys( [object: object] , [key: string])

Takes the input array of objects and returns a new array of objects with only the keys that were in the array.

# Example Use

```javascript
// Example Persons Object showing data we don't need for our pipeline
const persons = {
  id: "a1b2c3d4-e5f6-7890-abcd-123456789012", // Don't Need
  names: [
    {
      fullName: "John Michael Smith Jr.",
      firstName: "John", // Don't Need
      middleName: "Michael", // Don't Need
      lastName: "Smith", // Don't Need
      pedigree: "Jr.", // Don't Need
      preference: "preferred",
    },
  ],
  dateOfBirth: "1985-03-15", // Don't Need
  gender: "male", // Don't Need
  addresses: [
    {
      address: {
        addressLines: [
          "157 Picturesque Dr",
          "47 W 13th St, New York, NY 10011, USA",
        ],
        code: "1", //Don't need
        place: {
          country: {
            code: "USA",
            locality: "Lubbock",
            postalCode: "79409",
            postalTitle: "UNITED STATES OF AMERICA",
            region: {
              // Don't Need
              id: "b13a9c8e-adac-4870-b3fa-86906546fcfb",
            },
            subRegion: {
              // Don't Need
              code: "016",
              title: "Lehigh",
            },
            title: "United States of America", // Don't Need
          },
        },
      },
      endOn: "2042-10-23T04:00:00Z", // Don't Need
      startOn: "2014-10-02T04:00:00Z", // Don't Need
      type: {
        addressType: "mailing",
        detail: {
          // Don't Need
          id: "60646b10-1132-4d0f-9390-a95306cebfd2",
        },
      },
    },
  ],
};
let newPersons = persons;

// Reduce data in Names
if (newPersons?.names) {
  newPersons.names = keepArrayKeys(newPersons.names, [
    "fullName",
    "preference",
  ]);
}

// Reduce nested data in Addresses
newPersons?.addresses?.forEach((addr) => {
  // Reduce nested data in address.place.county
  if (addr?.address?.place?.country) {
    addr.address.place.country = keepObjectKeys(addr.address.place.country, [
      "code",
      "locality",
      "postalCode",
      "postalTitle",
    ]);
  }
  // Reduce nested data in address
  if (addr?.address) {
    addr.address = keepObjectKeys(addr.address, ["addressLines", "place"]);
  }
  // Reduce nested data in type
  if (addr?.type) {
    addr.type = keepObjectKeys(addr.type, ["addressType"]);
  }
});

// Reduce data in Addresses
newPersons.addresses = keepArrayKeys(newPersons?.addresses, [
  "address",
  "type",
]);

// Reduce data in Persons
newPersons = keepObjectKeys(newPersons, ["names", "addresses"]);

console.log(newPersons);
```

OUTPUT

```json
{
  "names": [
    {
      "fullName": "John Michael Smith Jr.",
      "preference": "preferred"
    }
  ],
  "addresses": [
    {
      "address": {
        "addressLines": [
          "157 Picturesque Dr",
          "47 W 13th St, New York, NY 10011, USA"
        ],
        "place": {
          "country": {
            "code": "USA",
            "locality": "Lubbock",
            "postalCode": "79409",
            "postalTitle": "UNITED STATES OF AMERICA"
          }
        }
      },
      "type": {
        "addressType": "mailing"
      }
    }
  ]
}
```

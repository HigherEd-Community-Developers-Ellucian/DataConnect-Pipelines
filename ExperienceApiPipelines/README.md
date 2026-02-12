# Pipelines for use in Experience Extensions

These Pipelines are intended to be used in the Experience SDK for creating extensions.

Example of using these pipelines

- 'your-pipeline' is the name of your pipeline
- 'parameterName' is the name of one of your parameters.
- Note: you will have a parameter of ethosApiKey as defined in both the pipeline and extension.js, the value of it is provided through Experience Configuration, not the SDK, as authenticatedEthosFetch handles it for you

```javascript
import { useData , useCardInfo } from "@ellucian/experience-extension-utils";
import React, { useState } from "react";

const MyExtension = () => {

  const { authenticatedEthosFetch } = useData(); // Standard used to get data from Ethos
  const { cardId } = useCardInfo();  // Used by authenticatedEthosFetch
  const [fetchedData, setFetchedData] = useState(); // Will store the data we got from Ethos


  const fetchData = () => {
      if ( fetchedData ) {
        setFetchedData([]);  // Clear the data if previously retrieved
      }
      authenticatedEthosFetch(`your-pipeline?cardId=${cardId}&parameterName=yourValue`)
        .then((response) => {
          if (!response.ok) {
            console.log(response); // Put error handling here
          } else {
            return response;
          }
        })
        .then((fetchResponse) => fetchResponse?.json() // Convert Response to JSON)
        .then((fetchJson) => {
          setFetchedData = fetchJson; // Store the results
        })
        .catch((fetchError) => {
          console.log(fetchError); // Put error handling here
        });
  };

  // Other Code before return
  return (
    <>
     {JSON.stringify(fetchedData)}
    </>
  );
};

export default MyExtension;
```

# Overview of Pipelines

## Delete

- none yet

## Get

- schoolname-get-person-by-id
  - Banner Only
  - Retrieves person related data for a given PIDM or ID

## post

- none yet

## put

- none yet

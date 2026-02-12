This API is for Banner only

# Parameters

- ethosApiKey
  - required
- pidm
  - required
  - can be PIDM or ID

# Fittings

- Handle ID/PIDM
  - converts the input from ID into PIDM if ID was provided
  - converts PIDM into ID
  - stores both to the message
  - CUSTOMIZE THIS, depending on how your school formats PIDMs into IDs you will need to do that conversion here
  - If you do not have a correlation between PIDM and ID you will need to re-engineer portions of this pipeline
- persons
  - retrieves the persons api which handles most of the base person related data
- Copy persons.id to bannerGuid
  - makes it easier to get the bannerGuid for other API calls
  - also destructures person, normally an array into a single object since there will only be one returned. Makes future code easier
- identification-additional-identification
  - gets other ids from GORADID
- user-identity-profiles
  - gets ERP roles from GORIROL

# Permissions

You will need to make sure that your API User in BANSECR has access to GORIROL and GORADID if they don't already

# Return

```javascript
{
  'bannerPidm': number,
  'bannerId' : string,
  'bannerGuid' : string,
  'persons' : ojbect, //persons
  'goradid' : array, //identification-additional-identification
  'gorirol' : object //user-identity-profiles
}
```

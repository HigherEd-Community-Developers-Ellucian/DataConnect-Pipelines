This API is for Banner only

# Parameters

- startsOnOrBeforeDate
  - Starts On or Before Date
  - The Date which the term(s) will start on or before. Often this today through a future date.
  - STRING in YYYY-MM-DD format
  - OPTIONAL, Will default to 365 days in the future
- endsOnOrAfterDate
  - Ends On or After Date
  - The Date which the term(s) will end on or after. Often this a past date through today.
  - STRING in YYYY-MM-DD format
  - OPTIONAL, Will default to 365 days ago.
- calculationDate
  - Term Calculation Date
  - The date all the buckets of Terms will calculate as "Today".
  - This is used to determine is in the past, current, and future.
  - STRING in YYYY-MM-DD format
  - OPTIONAL, Will default to Today.

# Fittings

This will treat "Semesters" as any term where STVTERM_TRMT_CODE = 'S'. If you use another value, change it in the fitting.

- Set Dates
  - Handles setting default dates for each parameter that didn't have a date set
- Get term-codes
  - API call to Banner API term-codes
- Create Groupings
  - Calculates all the possible groups of terms
  - Ignores any terms where the STVTERM_TRMT_CODE is null (e.g. 000000, 999999)
  - By default term-codes sorts the return by Start Date desc, End Date desc. The pipeline presumes that default sorting
  - Groups
    - terms
      - All terms that were returned by the term-codes API
    - currentTerms
      - Any Terms where the Term Calculation Date is between Start Date and End Date
    - futureTerms
      - Any Terms where the Term Calculation Date is < Term Start Date
    - pastTerms
      - Any Terms where the Term Calculation Date is > Term End Date
    - currentSemesters
      - Any Semesters where the Term Calculation Date is between Start Date and End Date
    - futureSemesters
      - Any Semesters where the Term Calculation Date is < Term Start Date
    - pastSemesters
      - Any Semesters where the Term Calculation Date is > Term End Date
    - currentTerm
      - The first value from currentTerms
    - nextTerm
      - The last value from futureTerms
    - lastTerm
      - The first value from pastTerms
    - currentSemester
      - The first value from currentSemesters
    - nextSemester
      - The last value from futureSemesters
    - lastSemester
      - The first value from futureSemesters

# Return

```javascript
// termCodes see term-codes API details for data structure
{
  "startsOnOrBeforeDate": date string,
  "endsOnOrAfterDate": date string,
  "calculationDate": date string,
  "terms": [ termCodes ],
  "currentTerms": [ termCodes ],
  "futureTerms": [ termCodes ],
  "pastTerms": [ termCodes ],
  "currentSemesters": [ termCodes ],
  "futureSemesters": [ termCodes ],
  "pastSemesters": [ termCodes ],
  "currentTerm": termCodes,
  "currentSemester": termCodes,
  "nextTerm": termCodes,
  "lastTerm": termCodes,
  "nextSemester": termCodes,
  "lastSemester": termCodes
}
```

# Courses Service
Provides service for adding, removing, and updating course information

## Entities

### Course
| Key | Type | Value|
|-----|------|------|
|title| String| Introduction to web development |
|quarter| String | Aut |
|year| Integer | 2015 |
|curriculum| String | INFO |
|number| Integer | 343 |
|description| String| Learn basic CSS, HTML, and JS to create static and interactive webpages |
|id|String| de305d54-75b4-431b-adb2-eb6b9e546014|
|ta_id|String| de305d54-75b4-431b-adb2-eb6b9e546014|
|teacher_id|String| de305d54-75b4-431b-adb2-eb6b9e546014|

## API

### POST `/course`

Creates a new course with the body containing all of the information

### Body

[Course](#course)

#### Reply

| HTTP Code | Response|
|-----------|---------|
|200|[Course](#course).id|
|400| Bad Request |
|401| Admin Required |
|404| Teacher not found |
|404| TA not found |

### GET `/course/{id}`

Fetches information about a given course offering which matches the specified ID

#### Reply

| HTTP Code | Response|
|-----------|---------|
|200|[Course](#course).id|
|400| Bad Request |
|401| Admin Required |
|404| Course Not Found |

### PUT `/course/{id}`

Updates a course with new information

#### Body

[Course](#course)

#### Reply
| HTTP Code | Response|
|-----------|---------|
|200|[Course](#course).id|
|400| Bad Request |
|401| Admin Required |

### DELETE `/course/{id}`
Removes a given course from the database

#### Reply

| HTTP Code | Response|
|-----------|---------|
|200|Course Deleted|
|400| Bad Request |
|401| Admin Required |
|404| Course Not Found|

### GET `/student/{userID}/courses`

Get back a list of courses that a user is registered for

#### Reply

| HTTP Code | Response|
|-----------|---------|
|200|[[Courses](#course)]|
|400| Bad Request |
|401| Teacher Required |
|404| Student Not Found |

### POST `/student/{userID}/{courseId}`

Adds a user to the registry for a given course

#### Body
[Course](#course)

#### Reply

| HTTP Code | Response|
|-----------|---------|
|200| User Added|
|400| Bad Request |
|401| Admin Required |
|404| User Not Found |
|404| Course Not Found |

### DELETE `/student/{userID}/{courseId}`
Removes a user from the registry of a given course

#### Reply

| HTTP Code | Response|
|-----------|---------|
|200| User Removed|
|400| Bad Request |
|401| Admin Required |
|404| User Not Found |
|404| Course Not Found |

### GET `/teacher/{userId}/courses`
Retrieves the list of courses that the teacher is a teacher of

#### Reply
| HTTP Code | Response|
|-----------|---------|
|200| [ [Courses](#course) ]|
|400| Bad Request |
|401| Teacher Required |
|404| User Not Found |
|404| Course Not Found |



---
>-
Young Wizard, you will be creating Hogwart's online student registration.
Professor Neville Longbottom will guide you.

Because you are a highly disciplined Wizard, you will be writing your code test
first.

Setup --
---

# Angular Hogwarts TDD Kata _(Now with Promises!)_

"You are here to learn the subtle science and exact art of code-crafting. As there is little foolish wand-waving here, many of you will hardly believe this is magic." --Professor Snape

## Introduction

Hogwarts has embraced Muggle Technology!

Professor Arthur Weasley has just invented the first magic-powered computer, Hex, and it works at Hogwarts.

```bash
git clone https://github.com/dweedon/angular-hogwarts-tdd-kata.git
cd angular-hogwarts-tdd-kata
npm install
```

To get started run: `npm start`

The app will be running at: http://localhost:3000/

To run the tests use: `npm test`

The results will magically appear in the console.

## 0\. Coming up to Speed

How will you begin, my young wizard friend? **I will explore:**

1. **I will click the `app`.**
2. **I will notice `karma` running tests in the `console`.**
3. **I will notice the two menu items in the app.**

## 1\. Story: Show Course Catalog

Acceptance: Students will be able to see a catalog of courses.

--------------------------------------------------------------------------------

It is time to start coding. Where will you start? **Lets take a look at the catalog UI inside file `client/app/catalog/catalog.template.html`.**

I seem to have forgotten how to view the catalog. **Oh, Professor, you just refresh `localhost:3000` and click on the Catalog menu.**

### 1.0\. UI For Course Catalog

Lets take a look at the UI Markup for the Course Catalog:

`client/app/catalog/catalog.html`

```html
...
            <tbody>
                <tr ng-repeat="course in vm.courses">
                    <td>{{course.name}}</td>
                    <td>{{course.startTime | date: 'h:mm a'}}</td>
                    <td>{{course.professor}}</td>
                    <td>{{course.credits}}</td>
                </tr>
```

I see you expect to have a `courses` array on `courseCatalogController`. **Yes.**

I reloaded `localhost:3000` and clicked on menu item catalog and I don't see anything. **It is because we haven't hooked it up.**

How will you hook it up? **By resolving the data (with promises) and binding it to the view before the Controller is initialized.**

### 1.1\. Make Test Error

Can you show me what you mean? **Sure. Here is the core of the test.**

**Lorem Demonstratio Facilius**

`client/app/catalog/catalog.module.spec.js`

```javascript
describe('Course Catalog Module Configuration', function () {
    describe('Route', function () {
        it('should get a list of courses', function () {
            expect(mockCourses.getAll).to.have.been.calledOnce;
        });
    });
});
```

Very nice, you wrote the description and the expectation first. **Thank you. Keeping the test simple helps my thinking.**

What happens if you run it? **It will generate errors. You can see them by looking at your CLI karma results).**

What is the meaning of: "mockCourses is not defined"? **It means my mockCourses is not setup -- I'm referencing it in my test before I even declare it.**

### 1.1\. Make Test Fail

What's the first step? **Declare the mockCourses.**

Yes, and then? **I'm not sure.**

Do you remember how to cast the Dependency Injection spell? **I remember now.**

**Accio Dependentiam Injecious**

`client/app/catalog/catalog.module.spec.js`

```javascript
...

describe('Course Catalog Module Configuration', function() {
  var $state;
  var $rootScope;
  var courses = ['courses'];
  var mockCourses = {
    getAll: sinon.stub(),
  };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('Courses', mockCourses);
  }));

  beforeEach(inject(function(
    _$state_,
    _$rootScope_,
  ) {
    $state = _$state_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function() {
    mockCourses.getAll.returns(courses);
  })

  describe('Route', function () {
    it('should get a list of courses', function() {
      $state.go('catalog');
      $rootScope.$digest();

      expect(mockCourses.getAll).to.have.been.calledOnce;

...
```

Does it pass now? **No, but it is not erroring. I think we are making progress? We are seeing a failing test (expected getAll to be called once but was called 0 times).**

You are on the path to enlightenment. It is wise to celebrate any failure that doesn't kill you. **Yeah!???**

What are you doing inside `beforeEach`? **We are creating a mock `Courses` service and `$provide` the mock `Courses` service for `window.module('hogwarts')`. Then we `inject` a temporary `$state` and `$rootScope` into our tests.**

**We use `$provide` to mock out services and give them _to_ our app, and `inject` to pull real services and tools _from_ our app**

### 1.1\. Make Test Pass

How do you make it pass? **The test says the Route config needs to call getAll on the `Courses` service when the route is initialized.**

`/client/app/catalog/catalog.module.js`

```javascript
'use strict';

angular.module('hogwarts.catalog', [])

.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('catalog', {
    url: '/catalog',
    component: 'courseCatalog',
    resolve: {
      courses: function(Courses) {
        Courses.getAll();
      },
    },
  });
})
```

Is it passing? **Yes!**

### 1.1\. Refactor

Put this into your Remembrall: Whenever tests are passing, time for refactoring. **I don't see anything that needs refactoring.**

### 1.2\. Failing

You have completed your first test. One point for Hufflepuff. Is the story complete? **No, we are only making the call to the service, we aren't assigning it to anything! I can do that!**

Ahem. You can write a test for that? **Oh, yes, that's what I meant.**

**Etiam Dolor Scopus**

`client/app/catalog/catalog.module.spec.js`

```javascript
...

  beforeEach(inject(function(
    ...
    _$injector_
  ) {
    ...
    $injector = _$injector_;
  }));

  describe('Route', function () {

    it('resolves a list of courses', function() {
      mockCourses.getAll.returns(courses);

      $state.go('catalog');
      $rootScope.$digest();

      expect($injector.invoke($state.current.resolve.courses)).to.equal(courses);
    });

    ...
```

### 1.2\. Passing

`/client/app/catalog/catalog.module.js`

```javascript
...

resolve: {
  courses: function(Courses) {
    return Courses.getAll();
  },
}
...
```

### 1.2\. Refactor

Does this need refactoring? **Looks like we are repeating a block of code in our two tests, lets clean it up.**

`client/app/catalog/catalog.module.spec.js`

```javascript
...

  describe('Route', function() {
    beforeEach(function() {
      mockCourses.getAll.returns(courses);

      $state.go('catalog');
      $rootScope.$digest();
    });

    it('should get a list of courses', function() {
      expect(mockCourses.getAll).to.have.been.calledOnce;
    });

    it('resolves a list of courses', function() {
      expect($injector.invoke($state.current.resolve.courses)).to.equal(courses);
    });

    ...
```

### 1.3\. Failing

Are we finished with the story? **No, the catalog does not show up on the web page. The `catalog.template.html` UI expects an property called `catalog` on the controller. We need to get it from the route's resolve into the controller. Time to cast our Component Binding spell. Er, I mean, let's start with a test!**

`client/app/catalog/catalog.component.spec.js`

```javascript
describe('courseCatalog Component', function() {
  var ctrl;
  var $scope;
  var $compile;
  var courses = ['courses'];

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('Courses', { getAll: sinon.stub() });
  }));

  beforeEach(inject(function($rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('bindings', function() {
    beforeEach(function() {
      var element = $compile(angular.element(
        '<course-catalog courses="courses"></course-catalog>'
      ))($scope);

      $scope.courses = courses;
      $scope.$apply();

      ctrl = element.controller('courseCatalog');
    });

    it('should bind courses to the controller', function() {
      expect(ctrl.courses).to.equal(courses);
    });
  });
});
```

### 1.3\. Passing

`client/app/catalog/catalog.component.js`

```javascript
...

  restrict: 'E',
  bindings: {
    courses: '<',
  },
  templateUrl: 'catalog.template.html',

...

```

### 1.3\. Refactor
Looks good to me, what do you think? **No repeating code, but that sure is a lot of test code for such a small implementation detail.**

Yes, it is, and you might be fine with expecting component binding to just work, but this is a TDD Kata, no new code without tests. If we were using a module loader we could just bring in the component object and assert that the bindings are what we expect them to be, rather than how we are doing it here, which tests the effects of the binding.

So are we finished with the story? **No, Professor Longbottom. Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work next week when you have a pair. **Ok, I won't deploy it and I won't write automated acceptance tests. But I must inspect my beautiful work (and make sure it is working).**

### 1.4\. End to End

You can see it by loading `localhost:3000` into your browser and clicking on Catalog (at the top). **I am seeing the page now.**

Well done, young Wizard. You have finished your story. Another point for Hufflepuff. **Thank you, I like the write the test, see it fail, write code to make it pass, and then refactor rhythm. I also like seeing what the end user sees.**

// TODO: Update this to the promise based code

## 2\. Story: Register for Courses

Acceptance: Students register in course catalog then view their courses in schedule.

--------------------------------------------------------------------------------

### 2.0\. UI for Registration

You have shown us how to test getting from a repository and displaying the results. I would like to see some interaction. **Sure, how about a link called register on the catalog page.**

That works for now. **Here is the updated catalog.html**

`app/catalog/catalog.html`

```html
...

                <tr ng-repeat="course in catalog">

                    ...

                    <td>
                        <a href="javascript:void(0);" ng-click="register(course.id)">
                            Register
                        </a>
                    </td>
                </tr>
```

We need a place to see the registered courses. **Someone else already put it inside `wizard/schedule.html`**

Hmm, I am seeing duplication between the your course catalog and their schedule. **Yes, I will take care of that later with a `ng-include`.**

OK. Where do you want to start? **In the course catalog controller of course.**

### 2.1\. Erroring

Don't you mean the course catalog controller spec. **Yes, Professor; this is a TDD Kata, after all.**

`test/catalog/catalog-controller-specs.js`

```javascript
...

    var mockCatalogRepository,

        mockRegistrationService,

      ...

        inject(function ( ... , registrationService) {

            ...

            mockRegistrationService = sinon.stub(registrationService);

            ...

            $controller("CatalogController", {
                ... ,
                registrationService: mockRegistrationService
            });

      ...

    describe('when registering for a course', function() {
        var courseId = 'courseId';
        var response = {success: true, message: ''};

        it('adds the course to the wizard\'s schedule', function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
            sinon.assert.calledWith(mockRegistrationService.register, courseId);
        });

    });

});
```

You have done amazing work. You added a `mockRegistrationService` and stubbed it at the top level. You have mocked it inside a new `describe` block and written a test that says we are delegating the add course to the `registrationService`. **Thank you. But when I run the tests, They are all erroring!**

### 2.1\. Failing

Yes, it's a tricky spell, isn't it? **Yes. I think I need to define the `register` method on the `registrationService` in the `wizard` directory so the mocking framework knows how to stub it.**

**Mocus Definum Servitium**

`app/wizard/registration-service.js`

```javascript
hogwartsApp
.factory('registrationService', function() {
    return {
        register: function(courseId) {
        }
    };
});
```

Very good, you have one test failing, you're almost there. **My error now says "scope.register is not a function". Oh, duh, I need to implement the function register() in the CatalogController.**

Professional Wizards do not normally say 'Duh.' **Yes, Professor. I mean, No, Professor.**

### 2.1\. Passing

In order to do that you will need to? **Um... I need to inject the `registrationService` into the the `CatalogController` so that I can call it.**

`app/catalog/catalog-controller.js`

```javascript
...

.controller("CatalogController", function ( ... , registrationService) {

    ...

    $scope.register = function(courseId) {
        registrationService.register(courseId);
    };

});
```

Very good, you remembered to run the tests again. **Yes, it worked!**

### 2.2\. Failing

Next we need to show the student the result of their registration attempt. **I will put the `registrationService` response on the scope so the UI can access it.**

`test/catalog/catalog-controller-specs.js`

```javascript
...

    describe('when registering for a course', function() {

        ...

        it('adds the registration response to the scope', function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
            expect(scope.response).toEqual(response);
        });

    ...
```

### 2.2\. Passing

And to get it passing... **That is as simple as adding `$scope.response =`**

`app/catalog/catalog-controller.js`

```javascript
...

    $scope.register = function(courseId) {
        $scope.response = registrationService.register(courseId);
```

### 2.2\. Refactor

I smell duplication in the test. **Yes and I am willing to remove it, while all my tests are passing. I am adding a `beforeEach` right now and removing the duplication.**

**Facio Abdo Duplicatam**

`test/catalog/catalog-controller-specs.js`

```javascript
...

    describe('when registering for a course', function() {

        ...

        beforeEach(function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
        });

        it('adds the course to the wizard\'s schedule', function() {
            sinon.assert.calledWith(mockRegistrationService.register, courseId);
        });

        it('adds the registration response to the scope', function() {
            expect(scope.response).toEqual(response);
        });
    });
```

Are your tests still passing? **Yes.**

Are you finished with this story? **No. We are delegating to the `registrationService` which we haven't written yet! Of course, I will write a test for `registrationService` first.**

### 2.3\. Erroring

`test/wizard/registration-service-specs.js`

```javascript
describe('registrationService', function () {

    describe('when registering for a course', function () {
        var course = {id: 'Potions'};

        it ('saves the course to the wizardRepository', function() {
            service.register(course.id);
            sinon.assert.calledWith(
                mockWizardRepository.save, {courses: {'Potions' : course}}
            );
        });

    });

    ...
```

You have a test that clearly states your intent: registering leads to a new course in the `wizardRepository`. **Yes but it won't run until I use the Dependency Injection spell again.**

**Invertere Injicio Dependeo**

### 2.3\. Failing

Looking at your test, you obviously need a `mockWizardRepository` that has a `save` method. But how are you going to convert `course.id` into a `course`? **I am going to get all the courses from the `catalogRepository` and then iterate over them until I find the one I want.**

That would have the code smell: _Inappropriate intimacy_. Can you think of another way? **Oops, I just missed the method `getCourse(courseId)` on the `catalogRepository`. I will call that one instead.**

**Notice registration service tests are in the `wizard` directory.**

`test/wizard/registration-service-specs.js`

```javascript
describe('registrationService', function () {

    var service,
        mockCatalogRepository,
        mockWizardRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (registrationService, catalogRepository, wizardRepository) {
            service = registrationService;
            mockCatalogRepository = sinon.stub(catalogRepository);
            mockWizardRepository = sinon.stub(wizardRepository);
        });
    });

    describe('when registering for a course', function () {

        ...

        beforeEach(function() {
            mockCatalogRepository.getCourse.returns(course);
            mockWizardRepository.get.returns({courses: {}});
        });

        ...
```

### 2.3\. Passing

`app/wizard/registration-service.js`

```javascript
hogwartsApp
.factory('registrationService', function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = catalogRepository.getCourse(courseId),
                wizard = wizardRepository.get();

            wizard.courses[course.id] = course;
            wizardRepository.save(wizard);
        }
    };

});
```

### 2.3\. Refactor

What does the last two lines do? **It registers the wizard for the course.**

Can you clarify it in code? **You mean extract the last 2 lines into a method.** Yes.

**Accio Extractum Modious**

`app/wizard/registratioioion-service.js`

```javascript
...

        register: function(courseId) {
            var course = catalogRepository.getCourse(courseId),
            wizard = wizardRepository.get();

            registerWizardForCourse(wizard, course);
        }
    };

    function registerWizardForCourse(wizard, course) {
        wizard.courses[course.id] = course;
        wizardRepository.save(wizard);
    }

...
```

### 2.4\. Failing

A service should always return a response. **You mean something like this?**

**Responsum Exspectant**

`test/wizard/registration-service-specs.js`

```javascript
...

    describe('when registering for a course', function () {

        ...

        it('returns a success response', function () {
            var response = service.register(course.id);
            expect(response.success).toBeTruthy();
        });

    ...
```

Exactly!

### 2.4\. Passing

`app/wizard/registration-service.js`

```javascript
...

        register: function(courseId) {

            ...

            return registerWizardForCourse(wizard, course);

    ...

    function registerWizardForCourse(wizard, course) {

        ...

        return {success: true};
    }

...
```

### 2.5\. Failing

How will the student know if they are really registered? **They will see their courses on the schedule page.**

How will they see their courses on the schedule page? **Hmm, let's see. The schedule.html is already written. It looks like it expects a wizard object on the scope. The `wizard` has `courses`.**

You are indeed a very promising young wizard. **I will write tests for the schedule controller. I'm writing both tests because the code to pass them is one line.**

`test/wizard/schedule-controller-specs.js`

```javascript
describe('ScheduleController', function () {
    var scope, mockWizardRepository;
    var wizard = {courses: {'foo': {id: 'foo'}}};

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, wizardRepository) {
            scope = $rootScope.$new();

            mockWizardRepository = sinon.stub(wizardRepository);
            mockWizardRepository.get.returns(wizard);

            $controller("ScheduleController", {
                $scope: scope,
                wizardRepository: mockWizardRepository
            });
        });
    });

    describe('when the controller first loads', function () {
        it('gets the wizard from the repository', function () {
            sinon.assert.calledOnce(mockWizardRepository.get);
        });

        it('puts wizard on the scope', function() {
            expect(scope.wizard).toEqual(wizard)
        });
    });
});
```

### 2.5\. Passing

You can make the tests pass? **Yes, this is less painful than drinking a Polyjuice Potion:**

`app/wizard/schedule-controller.js`

```javascript
hogwartsApp
.controller("ScheduleController", function ($scope, wizardRepository) {
    $scope.wizard = wizardRepository.get();
});
```

### 2.9\. End to End

How are we going to end to end test it? **I will click the register link on the catalog menu and notice a message saying it was successful. Then I'll look at the schedule page and see the course I just registered for.**

Are we finished with this story? **It depends, do we have a story disallowing scheduling more than one course at the same time (unless they have a Time-Turner)?**

Yes that is another story. **Then, the software works as expected. The code is clean. Yes, I would say this story is done.**

Congratulations, two points for Hufflepuff. Now, as soon as I get this Leg-Locker Curse off, we can go to the Quidditch match.

## Story 3: Hat Sorts Randomly

Acceptance: Clicking multiple times will result in all houses being selected.

--------------------------------------------------------------------------------

We have a disaster, a crisis of epic proportion! Sorting Hat is celebrating at Hogsmeade with Nymphadora Tonks' ghost and refuses to leave. The replacement, the old straw thing that sorted you, is sorting everything according to this Kata! **I am not sure I see the problem.**

Everyone is being sorted into _Hufflepuff_! **Oh, no!, I could have been in Gryffindor! What can we do?**

We must change the Kata immediately to sort randomly. **I am on it.**

### 3\. Debugging

How will you find the bug? **I could open the debugger on `index.html#/sorting`, set a break point inside `sorting-hat-controller.js` on `$scope.sort`, click the sorting hat and then follow the code in the debugger down until I find the bug.**

You have tests, why not use them to help locate the bug? **I am not sure how.**

Take a look in the directories, `app/sorting/` and `test/sorting/`. **Oh, I see we have no corresponding test file for `random-number-service.js` that is probably the bug location.**

Sometime, you might have a test file but the test is missing. Code coverage can also help you find missing tests. **Good to know. Something is fishy with `Math.floor(Math.random() * (max - max)) + max;`**

You now have a choice, _write a test_ or open the _debugger_. **I choose test (this is a TDD Kata after all).**

### 3.1\. Failing

**I will create the file `test/sorting/random-number-service-specs.js` with the following tests in it.**

`test/sorting/random-number-service-specs.js`

```javascript
describe('randomNumberService', function () {
    var service;
    var stubMath;

    beforeEach(function () {
        module("hogwartsApp");
        stubMath = sinon.stub(Math, 'random');
        inject(function (randomNumberService) {
            service = randomNumberService;
        });
    });

    afterEach(function () {
        stubMath.restore();
    });

    describe('when generating a random number in range 0 - 3', function () {

        it ('returns 0 for random range 0.0 - 0.249', function() {
            stubMath.returns(0.249);
            expect(service.getInRange(0, 3)).toEqual(0);
        });

        it ('returns 1 for random range 0.25 - 0.49', function() {
            stubMath.returns(0.49);
            expect(service.getInRange(0, 3)).toEqual(1);
        });

        it ('returns 2 for random range 0.5 - 0.749', function() {
            stubMath.returns(0.749);
            expect(service.getInRange(0, 3)).toEqual(2);
        });

        it ('returns 3 for random range 0.75 - 1', function() {
            stubMath.returns(0.99);
            expect(service.getInRange(0, 3)).toEqual(3);
        });

    });

});
```

Nice work with the test coverage. **Thank you, Professor.**

### 3.1\. Passing

**To get it to pass, I replace the `return` section with the correct algorithm (straight from Arithmancy class).**

`app/sorting/random-number-service.js`

```javascript
...

            return Math.floor(Math.random() * (max - min + 1)) + min;

...
```

### 3.9\. End to End

Have you looked at the website? **Yes students are now being sorted into different houses.**

Excellent! Three points for Hufflepuff.

# O.W.L.s and N.E.W.T.s

The Kata is officially over and Stinksap's not poisonous. If you are here with working code, you are awarded an _Acceptable_ OWL. If you want a NEWT or a higher grade, complete some or all of the following stories/tasks.

## 4\. Disallow Registering for Multiple Simultaneous Classes

Acceptance: Students attempting to register for multiple classes at the same time will be shown a message saying this is not allowed and the second class will not be added to their schedule.

## 5\. Allow Multiple Simultaneous Classes with a Time-Turner

Acceptance: Students with a time-turner are be allowed to register for multiple classes at the same time.

## 6\. Refactor out the duplicated UI in Schedule and Catalog

Using `ng-include` remove duplication between

`wizard/schedule.html` and `catalog/catalog.html`

## 7\. Modify this Kata to Use a Todo List

TDD gives you

- a known starting point (what is the test for that?)
- the ability to focus on a small piece of a bigger problem
- feedback that your changes haven't broken something

As you work confidently on you little solution, you need a place to store your alternative solutions, other problems and things you are going to do later to eliminate being distracted by them.

This is often in your journal in a Todo list.

Change this `README` to use a Todo list.

## 8\. Add Automated Acceptance Tests

When you favor mockist style TDD, you need automated Acceptance Tests.

Write at least one end to end [Protractor](https://github.com/angular/protractor) test for each story you implemented.

--------------------------------------------------------------------------------

Thank you!

"Happiness can be found even in the darkest of times, when one only remembers to turn on the light" --Albus Dumbledore

[![Creative Commons License](http://i.creativecommons.org/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/)

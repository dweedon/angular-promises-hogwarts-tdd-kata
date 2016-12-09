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

describe.('courseCatalogController', function() {
  var ctrl;
  var mockCourses;
  var courses = ['courses'];
  var $q;
  var $rootScope;
  var $componentController;

  beforeEach(function() {
    mockCourses = { getAll: sinon.stub() };

    window.module('hogwarts', function($provide) {
      $provide.value('Courses', mockCourses);
    });

    inject(function(_$componentController_) {
      $componentController = _$componentController_;
    });
  });

  beforeEach(function() {
    ctrl = $componentController('courseCatalog');
  });

  describe('on init', function() {
    it('should get a list of courses', function() {
      ctrl.$onInit();
      expect(mockCourses.getAll).to.have.been.calledOnce;
    });
  });

...
```
What are you doing inside `beforeEach`? **We are creating a mock `Courses` service and `$provide` the mock `Courses` service for `window.module('hogwarts')`. Then we `inject` a temporary `$rootScope` Angular's `$q` service and the `$componentController` service (for instatiating our controller) into our tests.**

**We use `$provide` to mock out services and give them _to_ our app, and `inject` to pull existing services and tools _from_ our app**

Does it pass now? **No, still erroring, but this time because of our app code. `TypeError: ctrl.$onInit is not a function`.  I guess we should go define that.**

`/client/app/catalog/catalog.controller.js`

```javascript
angular.module('hogwarts.catalog')

.controller('courseCatalogController', function () {
  'ngInject';

  var vm = this;

  vm.$onInit = function() {};
});

```

Does it pass now? **No, but now it is not erroring. I think we are making progress? We are seeing a failing test (expected stub to have been called exactly once, but it was called 0 times).**

You are on the path to enlightenment. It is wise to celebrate any failure that doesn't kill you. **Yeah!???**

### 1.1\. Make Test Pass

How do you make it pass? **The test says the Route config needs to call getAll on the `Courses` service when the route is initialized.**

`/client/app/catalog/catalog.controller.js`

```javascript
angular.module('hogwarts.catalog')

.controller('courseCatalogController', function (Courses) {
  'ngInject';

  var vm = this;

  vm.$onInit = function() {
    Courses.getAll();
  };
});

```

Is it passing? **Yes!**

### 1.1\. Refactor

Put this into your Remembrall: Whenever tests are passing, time for refactoring. **I don't see anything that needs refactoring.**

### 1.2\. Failing

You have completed your first test. One point for Hufflepuff. Is the story complete? **No, we are only making the call to the service, we aren't binding it to the controller!**

Ahem. You can write a test for that? **Oh, yes, that's what I meant.**

**Etiam Dolor Bindus Controllerous**

`client/app/catalog/catalog.controller.spec.js`

```javascript
...

  beforeEach(function() {
    ...
   inject(function(_$componentController_, _$q_, _$rootScope_) {
      $componentController = _$componentController_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    });
  });

  describe('on init', function () {

    ...

    it('should bind a list of courses to the controller', function() {
      var courses = ['courses'];

      mockCourses.getAll.returns($q.resolve(courses));

      ctrl.$onInit();
      $rootScope.$digest();

      expect(ctrl.courses).to.equal(courses);
    });

    ...
```

### 1.2\. Passing

`/client/app/catalog/catalog.controller.js`

```javascript
...


  vm.$onInit = function() {
    Courses.getAll().then(function(courses) {
      vm.courses = courses;
    });
  };

...
```

Alright! Excelent work dealing with that promise. I see you know the $q and $rootScope.$digest spells. Tell me more about how they work. **I'm using angular's $q to make getAll return a promise that resolves to `courses` since that is what the service really does. We can't just synchronously make calls to the API, that would be blocking! I want to use Angular's $q service instead of native promises or a library like (big) Q or Bluebird. $q is tied into Angular's $digest cycle, which makes it a lot easier to work with in our tests.**

Excelent, is it working. **Yes, but now my other test is broken, `      TypeError: Cannot read property 'then' of undefined`. I think I see the problem.

### 1.2\. Both Passing

`/client/app/catalog/catalog.controller.spec.js`

```javascript
...

describe('on init', function() {
    it('should get a list of courses', function() {
      var courses = ['courses'];

      mockCourses.getAll.returns($q.resolve(courses));
      
      ctrl.$onInit();

...
```

### 1.2\. Refactor

Does this need refactoring? **Looks like we are repeating a block of code in our two tests, lets clean it up.**

`client/app/catalog/catalog.controller.spec.js`

```javascript
...

  describe('on init', function() {
    var courses = ['courses'];

    beforeEach(function() {
      mockCourses.getAll.returns($q.resolve(courses));
      ctrl.$onInit();
      $rootScope.$digest();
    });

    it('should get a list of courses', function() {
      expect(mockCourses.getAll).to.have.been.calledOnce;
    });

    it('should bind a list of courses to the controller', function() {
      expect(ctrl.courses).to.equal(courses);
    });
  });

...
```
So are we finished with the story? **No, Professor Longbottom. Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work next week when you have a pair. **Ok, I won't deploy it and I won't write automated acceptance tests. But I must inspect my beautiful work (and make sure it is working).**

### 1.4\. End to End

You can see it by loading `localhost:3000` into your browser and clicking on Catalog (at the top). **I am seeing the page now.**

Well done, young Wizard. You have finished your story. Another point for Hufflepuff. **Thank you, I like the write the test, see it fail, write code to make it pass, and then refactor rhythm. I also like seeing what the end user sees.**


TODO: move to other test

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

Yes, it is, and you might be fine with expecting component binding to just work, but this is a TDD Kata, no new code without tests.

_If we were using a module loader, (we actually are, but the code is all written as if we weren't) we could just bring in the component object and assert that the bindings are what we expect them to be...__

So are we finished with the story? **No, Professor Longbottom. Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work next week when you have a pair. **Ok, I won't deploy it and I won't write automated acceptance tests. But I must inspect my beautiful work (and make sure it is working).**

// TODO: Update this to the promise based code

## 2\. Story: Register for Courses

Acceptance: Students register in course catalog then view their courses in schedule.

---

### 2.0\. UI for Registration

You have shown us how to test getting from a repository and displaying the results. I would like to see some interaction. **Sure, how about a link called register on the catalog page.**

That works for now. **Here is the updated catalog.html**

`client/app/catalog/catalog.template.html`

```html
...

        <tr ng-repeat="course in vm.courses">
          
          ...

          <td>
            <a href ng-click="vm.register(course.courseNumber)">Register</a>
          </td>
        </tr>
```

We need a place to see the registered courses. **Someone else already put it inside `schedule/schedule.template.html`**

Hmm, I am seeing duplication between the your course catalog and their schedule. **Yes, I will take care of that later with a `component`.**

OK. Where do you want to start? **In the course catalog controller of course.**

### 2.1\. Failing

Don't you mean the course catalog controller spec. **Yes, Professor; this is a TDD Kata, after all.**

`client/app/catalog/catalog.controller.spec.js`

```javascript
...

  var mockCourses;
  var mockRegistration;

  ...
  beforeEach(function() {
    mockCourses = { getAll: sinon.stub() };
    mockRegistration = { register: sinon.stub() };

    window.module('hogwarts', function($provide) {
      $provide.value('Courses', mockCourses);
      $provide.value('Registration', mockRegistration);
    });
  ...

  describe('when registering for a course', function() {
      var courseId = 'courseId';
      var response = {success: true, message: ''};

      it('adds the course to the wizard\'s schedule', function() {
          mockRegistration.register.returns($q.resolve(response));

          ctrl.register(courseId);
          $rootScope.$digest();

          expect(mockRegistration.register).to.have.been.calledWith(courseId);
      });

  });

});
```

You have done amazing work. You added a `mockRegistrationService` and stubbed it at the top level. You have mocked it inside a new `describe` block and written a test that says we are delegating the add course to the `registrationService`. **Thank you.** 

You have one test failing. **My error now says `TypeError: ctrl.register is not a function`. Oh, duh, I need to implement the function register() in the `courseCatalogController`.**

Professional Wizards do not normally say 'Duh.' **Yes, Professor. I mean, No, Professor.**

### 2.1\. Passing

In order to do that you will need to? **Um... I need to inject the `Registration` into the the `courseCatalogController` so that I can call it.**

`client/app/catalog/catalog.controller.js`

```javascript
...

.controller('courseCatalogController', function (Courses, Registration) {
  ...

  vm.register = function(courseNumber) {
    Registration.register(courseNumber);
  };
});
```

Very good, you remembered to run the tests again. **Yes, it worked!**

### 2.2 Failing

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

### 2.2\. Failing

Next we need to show the student the result of their registration attempt. **I will put the `Registration` response on the controller so the UI can access it.**

`client/app/catalog/catalog.controller.spec.js`

```javascript
...

  describe('when registering for a course', function() {

    ...

    it('binds the registration response to the controller', function() {
      mockRegistration.register.returns($q.resolve(response));

      ctrl.register(courseId);
      $rootScope.$digest();

      expect(ctrl.response).to.equal(response);
    });

    ...
```

### 2.2\. Passing

And to get it passing... **That is as simple as 'thening' the promise to get the response.**

`client/app/catalog/catalog.controller.js`

```javascript
...

  vm.register = function(courseNumber) {
    Registration.register(courseNumber).then(function(response) {
      vm.response = response;
    });
  };
});

```

### 2.2\. Refactor

I smell duplication in the test. **Yes and I am willing to remove it, while all my tests are passing. I am adding a `beforeEach` right now and removing the duplication.**

**Facio Abdo Duplicatam**

`test/catalog/catalog-controller-specs.js`

```javascript
...

    beforeEach(function() {
      mockRegistration.register.returns($q.resolve(response));
      ctrl.register(courseId);
      $rootScope.$digest();
    });

    it('adds the course to the wizard\'s schedule', function() {
      expect(mockRegistration.register).to.have.been.calledWith(courseId);
    });

    it('binds the registration response to the controller', function() {
      expect(ctrl.response).to.equal(response);
    });

...
```

Are your tests still passing? **Yes.**

Are you finished with this story? **No. We are delegating to the `Registration` which we haven't written yet, we are only mocking it! Of course, I will write a test for `Registration` first.**

### 2.3\. Erroring

`client/app/providers/registration.service.spec.js`

```javascript
describe('Registration Service', function() {
  describe('when registering for a course', function() {
    var courseNumber = 'courseNumber';
    var wizard = 'wizard';

    it('saves the course to the wizard repository', function() {
      mockWizards.wizard.returns(wizard);
      Registration.register(courseNumber);

      expect(mockWizards.wizard).to.have.been.calledWith('1');
      expect(mockWizards.addCourse).to.have.been.calledWith(wizard, courseNumber);
    });

    ...
```

You have a test that clearly states your intent: registering leads to a new course in the `wizardRepository`. **Yes but it won't run until I use the Dependency Injection spell again.**

**Invertere Injicio Dependeo**

### 2.3\. Erroring

Looking at your test, you obviously need a `mockWizards` that has `wizard` and `addCourse` methods.

`client/app/providers/registration.service.spec.js`

```javascript
describe('Registration Service', function () {
  var Registration;
  var mockWizards;

  beforeEach(function() {
    mockWizards = { 
      wizard: sinon.stub(),
      addCourse: sinon.stub(),
    };

    window.module('hogwarts', function($provide) {
      $provide.value('Wizards', mockWizards);
    });

    inject(function(_Registration_) {
      Registration = _Registration_;
    });
  });

  describe('when registering for a course', function() {
    var courseNumber = 'courseNumber';
    var wizard = 'wizard';

    beforeEach(function() {
      mockWizards.wizard.returns(wizard);
    });

  ...
```

### 2.3\. Failing

`Unknown provider: RegistrationProvider`

`client/app/proviers/registration.service.js`

```javascript
angular.module('hogwarts.providers')

.factory('Registration', function() {
  'ngInject';

  return {
    register: function() {

    },
  };
});
```

### 2.3\. Passing
`expected stub to have been called with arguments wizards`

`client/app/proviers/registration.service.js`

```javascript
...
  
.factory('Registration', function(Wizards) {

  ...

    register: function(courseNumber) {
      var wizard = Wizards.wizard('1');
      Wizards.addCourse(wizard, courseNumber);
    },

...

```

### 2.3\. Refactor


`client/app/proviers/registration.service.js`

```javascript
...

    register: function(courseNumber) {
      Wizards.addCourse(Wizards.wizard('1'), courseNumber);
    },

...
```

### 2.4\. Failing

A service should always return a response, in this case, we can chain off the promise that the `wizard.addCourse` will return. **You mean something like this?**

**Responsum Exspectant**

`client/app/proviers/registration.service.spec.js`

```javascript
...

  describe('when registering for a course', function() {
    ...

    beforeEach(function() {
      mockWizards.wizard.returns(wizard);
      mockWizards.addCourse.returns(Promise.resolve());
    });

    ...

    it('returns a success response', function() {
      var response = Registration.register(courseNumber);

      return response.then(function(res) {
        expect(res.success).to.be.ok;
      });
    });

    ...
```

Sure, you can do it that way. You could also inject the `$q`, `$rootScope` and call a `$digest` before making your assertion. That is particularly useful if you chain several times, but this way is fine, especially in cases like this.

### 2.4\. Passing

`client/app/proviers/registration.service.js`

```javascript
...

    register: function(courseNumber) {
      return Wizards.addCourse(Wizards.wizard('1'), courseNumber)
        .then(function() {
          return { success: true };
        });
    },

...
```

### 2.4\. Refactor

`client/app/proviers/registration.service.spec.js`

```javascript
...

  describe('when registering for a course', function() {
    var courseNumber = 'courseNumber';
    var wizard = 'wizard';
    var response;

    beforeEach(function() {
      mockWizards.wizard.returns(wizard);
      mockWizards.addCourse.returns(Promise.resolve());
      response = Registration.register(courseNumber);
    });

    it('saves the course to the wizard repository', function() {
      expect(mockWizards.wizard).to.have.been.calledWith('1');
      expect(mockWizards.addCourse).to.have.been.calledWith(wizard, courseNumber);
    });

    it('returns a success response', function() {
      return response.then(function(res) {
        expect(res.success).to.be.ok;
      });
    });
  });
```


### 2.5\. Failing

How will the student know if they are really registered? **They will see their courses on the schedule page.**

How will they see their courses on the schedule page? **Hmm, let's see. The `schedule.template.html` is already written. It looks like it expects a wizard object on the controller. The `wizard` has `courses`.**

You are indeed a very promising young wizard. **I will write tests for the schedule controller. I'm going to try this one a different way. I will resolve the data before the view is loaded.**

`app/catalog/schedule/schedule.module.spec.js`

```javascript
describe('Wizard Schedule Module Configuration', function() {
  var $state;
  var $rootScope;
  var $injector;
  var mockWizards;

  beforeEach(function() {
    mockWizards =  {
      wizard: sinon.stub(),
      getInfo: sinon.stub(),
    };

    window.module('hogwarts', function($provide) {
      $provide.value('Wizards', mockWizards);
    });
  });

  beforeEach(inject(function(_$state_, _$rootScope_, _$injector_) {
    $state = _$state_;
    $rootScope = _$rootScope_;
    $injector = _$injector_;
  }));

  describe('Route', function() {
    it('should respond to URL', function() {
      expect($state.href('schedule')).to.equal('/schedule');
    });

    it('should get a wizard', function() {
      var wizardRoute = 'wizardRoute';
      var wizardInfo = 'wizardInfo';

      mockWizards.wizard.returns(wizardRoute);
      mockWizards.getInfo.returns(wizardInfo);

      $state.go('schedule');
      $rootScope.$digest();

      expect(mockWizards.wizard).to.have.been.calledWith('1');
      expect(mockWizards.getInfo).to.have.been.calledWith(wizardRoute);
      expect($injector.invoke($state.current.resolve.wizard)).to.equal(wizardInfo);
    });
  });
});
```

### 2.5\. Passing

You can make the tests pass? **Yes, this is less painful than drinking a Polyjuice Potion:**

`client/app/schedule/schedule.module.js`

```javascript

...

  $stateProvider.state('schedule', {
    url: '/schedule',
    component: 'wizardSchedule',
    resolve: {
      wizard: function(Wizards) {
        return Wizards.getOne('1');
      },
    },
  });

...
});
```

### 2.6\. Failing

Now we bind it to the component

`client/app/schedule/schedule.component.spec.js`

```javascript

/* eslint-disable angular/window-service */

describe('wizardSchedule Component', function() {
  var ctrl;
  var $scope;
  var $compile;
  var wizard = 'wizard';

  beforeEach(function() {
    window.module('hogwarts');

    inject(function($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });
  });

  describe('bindings', function() {
    beforeEach(function() {
      var element = $compile(angular.element(
        '<wizard-schedule wizard="wizard"></course-catalog>'
      ))($scope);

      $scope.wizard = wizard;
      $scope.$apply();

      ctrl = element.controller('wizardSchedule');
    });

    it('should bind courses to the controller', function() {
      expect(ctrl.wizard).to.equal(wizard);
    });
  });
});

```
### 2.6\. Passing

`client/app/schedule/schedule.component.js`

```javascript
angular.module('hogwarts.schedule')

.component('wizardSchedule', {
  restrict: 'E',
  bindings: {
    wizard: '<',
  },
  controllerAs: 'vm',
  templateUrl: 'schedule.template.html',
});

```


### 2.9\. End to End

How are we going to end to end test it? **I will click the register link on the catalog menu and notice a message saying it was successful. Then I'll look at the schedule page and see the course I just registered for.**

Are we finished with this story? **It depends, do we have a story disallowing scheduling more than one course at the same time (unless they have a Time-Turner)?**

Yes that is another story. **Then, the software works as expected. The code is clean. Yes, I would say this story is done.**

Congratulations, two points for Hufflepuff. Now, as soon as I get this Leg-Locker Curse off, we can go to the Quidditch match.

# O.W.L.s and N.E.W.T.s

The Kata is officially over and Stinksap's not poisonous. If you are here with working code, you are awarded an _Acceptable_ OWL. If you want a NEWT or a higher grade, complete some or all of the following stories/tasks.

## 3\. Disallow Registering for Multiple Simultaneous Classes

Acceptance: Students attempting to register for multiple classes at the same time will be shown a message saying this is not allowed and the second class will not be added to their schedule.

## 4\. Allow Multiple Simultaneous Classes with a Time-Turner

Acceptance: Students with a time-turner are be allowed to register for multiple classes at the same time.

## 5\. Refactor out the duplicated UI in Catalog and Schedule

Use a component to remove duplication between

`client/app/catalog/catalog.template.html` and `client/app/schedule/schedule.template.html`

## 6\. Modify this Kata to Use a Todo List

TDD gives you

- a known starting point (what is the test for that?)
- the ability to focus on a small piece of a bigger problem
- feedback that your changes haven't broken something

As you work confidently on you little solution, you need a place to store your alternative solutions, other problems and things you are going to do later to eliminate being distracted by them.

This is often in your journal in a Todo list.

Change this `README` to use a Todo list.

## 7\. Add Automated Acceptance Tests

When you favor mockist style TDD, you need automated Acceptance Tests.

Write at least one end to end [Protractor](https://github.com/angular/protractor) test for each story you implemented.

--------------------------------------------------------------------------------

Thank you!

"Happiness can be found even in the darkest of times, when one only remembers to turn on the light" --Albus Dumbledore

[![Creative Commons License](http://i.creativecommons.org/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/)

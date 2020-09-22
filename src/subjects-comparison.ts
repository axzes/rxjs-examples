/*
                   s1    n(r)   n(x)    s2     n(j)   c    n(s)
Subject
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^------j------|----------
AsyncSubject
        s1         ^----------------------------------j|---------
        s1         ---------------------^-------------j|---------
BehaviorSubject
        s1         ^a----r------x--------------j------|----------
        s2         ---------------------^x-----j------|----------
ReplaySubject
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^r-x---j------|----------
*/


/*
  Original example: https://github.com/btroncone/learn-rxjs/blob/master/subjects/README.md
*/

console.clear();
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';

const subject = new Subject();
const asyncSubject = new AsyncSubject();
const behaviorSubject = new BehaviorSubject('a');
const replaySubject = new ReplaySubject(2);

const subjects = [
  subject,
  asyncSubject,
  behaviorSubject,
  replaySubject
];

const log = (subjectType: string) => (e: any) => console.log(`${subjectType}: ${e}`);

/**
 * Subscribes all subjects
 * @param  {string} subsName
 */
const subscribe = (subsName: string) => {
  console.log(`\nSUBSCRIBE ${subsName}`);
  subject.subscribe(log(`${subsName} subject`));
  asyncSubject.subscribe(log(`${subsName} asyncSubject`));
  behaviorSubject.subscribe(log(`${subsName} behaviorSubject`));
  replaySubject.subscribe(log(`${subsName} replaySubject`));
};

/**
 * Triggers 'next' in all subjects
 * @param  {string} value
 */
const next = (value: string) => {
  console.log(`\nNEXT(${value})`);
  subjects.forEach(o => o.next(value));
}

/**
 * Completes all subjects
 * @param  {} =>subjects.forEach(o=>o.next('s'
 */
const complete = () => {
  console.log('\nCOMPLETE');
  subjects.forEach(o => o.complete());
}

subscribe('s1');
next('r');
next('x');

subscribe('s2');
next('j');

complete();

next('s');

/*
OUTPUT:

SUBSCRIBE s1
s1 behaviorSubject: a

NEXT(r)
s1 subject: r
s1 behaviorSubject: r
s1 replaySubject: r

NEXT(x)
s1 subject: x
s1 behaviorSubject: x
s1 replaySubject: x

SUBSCRIBE s2
s2 behaviorSubject: x
s2 replaySubject: r
s2 replaySubject: x

NEXT(j)
s1 subject: j
s2 subject: j
s1 behaviorSubject: j
s2 behaviorSubject: j
s1 replaySubject: j
s2 replaySubject: j

COMPLETE
s1 asyncSubject: j
s2 asyncSubject: j

NEXT(s)
*/

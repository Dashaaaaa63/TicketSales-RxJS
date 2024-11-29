import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from './services/testing/observable-example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';

  constructor(
    private testing: ObservableExampleService,
  ) {
    testing.initObservable();
  }

  ngOnInit(): void {
    //Observable
    //first subscriber
    // const myObservable = this.testing.getObservable();
    // myObservable.subscribe((data) =>{
    //   // console.log('first myObservable data', data)
    // })
    //second subscriber
    // myObservable.subscribe((data)=>{
    //   // console.log('second myObservabledata', data)
    // });
    //Subject
    // const mySubject = this.testing.getSubject();
    // mySubject.subscribe((data) =>{
    //   //  console.log('first data subject', data)
    // });
    // mySubject.subscribe((data) => {
    //   //  console.log('second data subject', data)
    // });
    //send subjectData
    // mySubject.next('subject value');
    // //Behavior Subject
    // const myBehavior = this.testing.getBehaviorSubject();
    // myBehavior.subscribe((data) =>{
    //   // console.log('first data behaviorSubject', data)
    // });
    // myBehavior.next('new data from behaviorSubject');
    // myBehavior.next('new data1 from behaviorSubject');
  }


}



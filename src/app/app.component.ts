import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'formula1-blogger';

  test = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.test.valueChanges.subscribe(console.log)
  }

  sendTestData(){
    return 0
  }
}

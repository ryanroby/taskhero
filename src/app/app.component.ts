import { TokenService } from './Services/token.service';
import { GlobalVariables } from './global';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public globals: GlobalVariables,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('Token') === null) {
      this.globals.Token = uuidv4();

      const data = {
        token: this.globals.Token
      };

      this.tokenService.GenerateToken(data).subscribe(
        (res: any) => {
          localStorage.setItem('Token', this.globals.Token);
          window.location.reload();
        }
      );

    } else {
      this.globals.Token = localStorage.getItem('Token');
    }
  }
}

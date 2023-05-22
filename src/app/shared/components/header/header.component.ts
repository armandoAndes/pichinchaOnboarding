import { Component, OnInit } from '@angular/core';

import { HeaderComponentLabels } from '../../labels/header.labels';

import { ResponseLoginServiceInterface } from '../../interface/response-login-service.interface';

import { SessionEnum } from '../../enums/session.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerLabels = HeaderComponentLabels;
  public name: ResponseLoginServiceInterface | undefined;
  constructor() { }

  public ngOnInit(): void {
    this.name = JSON.parse(sessionStorage.getItem(SessionEnum.nameItem)!);
  }

}

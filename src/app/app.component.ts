import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { parse } from "bcp-47";
import { Subscription } from 'rxjs';
import { ArasaacPictogram } from './arasaac.model';
import { ArasaacService } from './arasaac.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  configForms = new FormGroup({
    activeTooltip: new FormControl(true, { nonNullable: true }),
    language: new FormControl(this.getLang(), { nonNullable: true }),
    searchText: new FormControl('')
  });
  public responses: { [key: string]: Array<ArasaacPictogram> } = {};
  public languages = ["an", "ar", "bg", "br", "ca", "de", "el", "en", "es", "et", "eu", "fa", "fr", "gl", "he", "hr", "hu", "it", "ko", "lt", "lv", "mk", "nl", "pl", "pt", "ro", "ru", "sk", "sq", "sv", "sr", "val", "uk", "zh"];
  private changesSub!: Subscription;

  constructor(private arasaacService: ArasaacService) { }

  ngOnInit(): void {
    chrome.storage.sync.get('activeTooltip', (value) => {
      this.configForms.controls["activeTooltip"].setValue(value ? <any>value['activeTooltip'] : true);
    });
    chrome.storage.sync.get('language', (value) => {
      this.configForms.controls["language"].setValue(value ? <any>value['language'] : this.getLang());
    });
    this.changesSub = this.configForms.valueChanges.subscribe(() => {
      chrome.storage.sync.set({ activeTooltip: this.configForms.controls["activeTooltip"].value, language: this.configForms.controls["language"].value });
    })
  }

  
  get respKeys() {
    return this.responses ? Object.keys(this.responses) : null;
  }

  async load() {
    this.responses = {};
    if (this.configForms.controls["searchText"]) {
      let searchTesxList = (<string>this.configForms.controls["searchText"].value).split(/(\s+)/);
      for (let i in searchTesxList) {
        let searchText = searchTesxList[i];
        if (searchText && searchText != " ") {
          try {
            this.responses[searchText] = await this.arasaacService.getPictograms(<string>this.configForms.controls["language"].value, searchText);
          }
          catch {
            this.responses[searchText] = [];
            console.info(`Not found ${searchText}`);
          }
        }
      };
    }
  }

  logValue(value: any) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: consoleLogTab,
        args: [value]
      });
    });
  }

  getLang() {
    var lang = parse(navigator.language).language;
    lang = lang == "zh" ? navigator.language : lang; // chinese lang code fix
    return lang;
  }

  ngOnDestroy(): void {
    if (this.changesSub) {
      this.changesSub.unsubscribe();
    }
  }
}

const consoleLogTab = (data: any) => console.log(data);

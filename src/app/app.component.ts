import { Component } from '@angular/core';
import { KontentAiService } from './services/kontent-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public projectId: string;
  public languageCodename: string;

  constructor(kontentAiService: KontentAiService) {
    this.projectId = kontentAiService.getProjectId();
    this.languageCodename = kontentAiService.getLanguageCodename();
  }
}

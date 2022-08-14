import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { map } from 'rxjs';
import { CoreComponent } from 'src/lib/core/core.component';
import { Hotel } from '../models';
import { KontentAiService } from '../services/kontent-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends CoreComponent implements OnInit {
  public hotels?: Hotel[];

  private readonly snackbarDuration = 4 * 1000;

  public isImporting: boolean = false;
  public isFetching: boolean = false;

  constructor(
    private kontentAiService: KontentAiService,
    private _snackBar: MatSnackBar,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }

  ngOnInit(): void {
    this.initHotels();
  }

  getHotelRouterLink(hotel: Hotel): string {
    return `/hotel/${hotel.system.codename}`;
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: this.snackbarDuration,
    });
  }

  private initHotels(): void {
    this.isFetching = true;
    super.markForCheck();
    super.subscribeToObservable(
      this.kontentAiService.getHotels().pipe(
        map((hotels) => {
          this.hotels = hotels;
          this.isFetching = false;
          super.markForCheck();
        })
      )
    );
  }

  async dropped(event: NgxFileDropEntry[]): Promise<void> {
    this.getFilesForUpload(event, async (files) => {
      if (files.length) {
        try {
          this.isImporting = true;
          super.markForCheck();
          const fileToImport = files[0];

          const data = await fileToImport.text();

          const response = await this.kontentAiService.importFromJson(
            JSON.parse(data) as any
          );
          console.log('Imported', response);

          this.isImporting = false;
          super.markForCheck();
          this.openSnackBar('Hotel has been imported successfully');
        } catch (error) {
          this.openSnackBar('Import failed');
          this.isImporting = false;
          super.markForCheck();
        }
      }
    });
  }

  private getFilesForUpload(
    dropFileEntries: NgxFileDropEntry[],
    callback: (files: File[]) => void
  ): void {
    const fileEntries = dropFileEntries.filter((m) => m.fileEntry.isFile);

    const files: File[] = [];

    if (fileEntries.length > 0) {
      const filesToProcess = [fileEntries[0]];

      for (const fileEntry of filesToProcess) {
        (fileEntry.fileEntry as FileSystemFileEntry).file((file) => {
          files.push(file);
          // if there is equal number of files in file array and expected number of files, execute callback
          if (files.length === filesToProcess.length) {
            callback(files);
          }
        });
      }
    }
  }
}

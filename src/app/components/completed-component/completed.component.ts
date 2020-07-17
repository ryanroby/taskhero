import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CompletedService } from 'src/app/Services/completed.service';
declare var $: any;

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  public Tasks = [];
  public ShowEmptyList = false;
  public SearchFilter = '';
  public TaskToRemove;
  public TaskToRestore;

  constructor(
    private completedService: CompletedService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.GetCompletedTasks();
  }

  public GetCompletedTasks() {
    this.completedService.GetCompletedTasks().subscribe(
      (res: any) => {
        this.Tasks = res.data;
        if (this.Tasks.length === 0) {
          this.ShowEmptyList = true;
        }
      }
    );
  }

  public RestoreTask() {
    const data = {
      Id: this.TaskToRestore
    };
    this.completedService.RestoreTask(data).subscribe(
      (res: any) => {
        for (let i = 0; i < this.Tasks.length; i++) {
          if (this.Tasks[i].id === this.TaskToRestore) {
            this.Tasks.splice(i, 1);
            this.toastr.info('Task incomplete');
          }
        }

        if (this.Tasks.length === 0) {
          this.ShowEmptyList = true;
        }
      }
    );
  }

  public DeleteTask() {
    const data = {
      Id: this.TaskToRemove
    };
    this.completedService.DeleteTask(data).subscribe(
      (res: any) => {
        for (let i = 0; i < this.Tasks.length; i++) {
          if (this.Tasks[i].id === this.TaskToRemove) {
            this.Tasks.splice(i, 1);
            this.toastr.info('Task removed');
          }
        }

        if (this.Tasks.length === 0) {
          this.ShowEmptyList = true;
        }
      }
    );
  }

  public OpenConfirmTaskRemoveModal(task) {
    $('#ConfirmTaskRemoveModal').modal('show');
    this.TaskToRemove = task;
  }

  public OpenConfirmTaskRestoreModal(task) {
    $('#ConfirmTaskRestoreModal').modal('show');
    this.TaskToRestore = task;
  }
}

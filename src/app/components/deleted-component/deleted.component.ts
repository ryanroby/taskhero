import { ToastrService } from 'ngx-toastr';
import { DeletedService } from './../../Services/deleted.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent implements OnInit {

  public Tasks = [];
  public ShowEmptyList = false;
  public SearchFilter = '';
  public TaskToRestore;

  constructor(
    private deletedSservice: DeletedService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.GetDeletedTasks();
  }

  public GetDeletedTasks() {
    this.deletedSservice.GetDeletedTasks().subscribe(
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
    this.deletedSservice.RestoreTask(data).subscribe(
      (res: any) => {
        for (let i = 0; i < this.Tasks.length; i++) {
          if (this.Tasks[i].id === this.TaskToRestore) {
            this.Tasks.splice(i, 1);
            this.toastr.info('Task restored');
          }
        }

        if (this.Tasks.length === 0) {
          this.ShowEmptyList = true;
        }
      }
    );
  }

  public OpenConfirmTaskRestoreModal(task) {
    $('#ConfirmTaskRestoreModal').modal('show');
    this.TaskToRestore = task;
  }
}

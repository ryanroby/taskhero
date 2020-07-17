import { TasksService } from './../../Services/tasks.service';
import { GlobalVariables } from './../../global';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public NewSection = false;
  public NewSectionTitle = '';
  public ShowEmptyList = false;

  public SectionToRemove;
  public TaskToRemove;
  public TaskToComplete;

  public SearchFilter = '';

  public Sections = [];
  public ReorderedSections = [];
  public ReorderedTasks = [];

  constructor(
    public globals: GlobalVariables,
    private taskService: TasksService,
    private dragulaService: DragulaService,
    private toastr: ToastrService
  ) {
    this.dragulaService.destroy('SECTIONS');
    this.dragulaService.createGroup('SECTIONS', {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === 'group-handle'
    });
  }

  ngOnInit() {
    this.GetSections();
  }

  public SaveNewSection(event) {
    this.NewSectionTitle = event.target.value;

    const data = {
      name: this.NewSectionTitle
    };

    this.taskService.CreateSection(data).subscribe(
      (res: any) => {
        this.toastr.info('Section added');
        res.data.tasks = [];
        this.Sections.push(res.data);
      }
    );
  }

  public GetSections() {
    this.taskService.GetSections().subscribe(
      (res: any) => {
        this.Sections = res.data;
        if (this.Sections.length === 0) {
          this.ShowEmptyList = true;
        }
      }
    );
  }

  public SaveNewTask(event, section) {
    const data = {
      name: event.target.value,
      section_id: section.id
    };

    this.taskService.CreateSectionTask(data).subscribe(
      (res: any) => {
        this.toastr.info('Task added');
        for (const sec of this.Sections) {
          if (sec.id === section.id) {
            sec.tasks.push(res.data);
          }
        }
      }
    );
  }

  public DeleteSection() {
    const data = {
      Id: this.SectionToRemove.id
    };

    this.taskService.DeleteSection(data).subscribe(
      (res: any) => {
        for (let i = 0; i < this.Sections.length; i++) {
          if (this.Sections[i].id === this.SectionToRemove.id) {
            this.Sections.splice(i, 1);
            this.toastr.info('Section removed');
          }
        }

        if (this.Sections.length === 0) {
          this.ShowEmptyList = true;
        }
      }
    );
  }

  public DeleteTask() {
    const data = {
      Id: this.TaskToRemove.id
    };

    this.taskService.DeleteTask(data).subscribe(
      (res: any) => {
        for (const sec of this.Sections) {
          for (let j = 0; j < sec.tasks.length; j++) {
            if (sec.tasks[j].id === this.TaskToRemove.id) {
              sec.tasks.splice(j, 1);
              this.toastr.info('Task removed');
            }
          }
        }
      }
    );
  }

  public CompleteTask() {
    const data = {
      Id: this.TaskToComplete.id
    };

    this.taskService.CompleteTask(data).subscribe(
      (res: any) => {
        for (const sec of this.Sections) {
          for (let j = 0; j < sec.tasks.length; j++) {
            if (sec.tasks[j].id === this.TaskToComplete.id) {
              sec.tasks.splice(j, 1);
              this.toastr.info('Task complete');
            }
          }
        }
      }
    );
  }

  public OpenConfirmSectionRemoveModal(section) {
    $('#ConfirmSectionRemoveModal').modal('show');
    this.SectionToRemove = section;
  }

  public OpenConfirmTaskRemoveModal(task) {
    $('#ConfirmTaskRemoveModal').modal('show');
    this.TaskToRemove = task;
  }

  public OpenConfirmTaskCompleteModal(task) {
    $('#ConfirmTaskCompleteModal').modal('show');
    this.TaskToComplete = task;
  }
}

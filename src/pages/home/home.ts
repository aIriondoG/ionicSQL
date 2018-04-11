import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasks: any[] = [];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public taskService: TasksServiceProvider
  ) {

  }
  ionViewDidLoad(){
    this.getAllTasks();
  }
  getAllTasks() {
    this.taskService.getAll()
      .then(task => {
        this.tasks = task;
      })
      .catch(error => {
        console.log(error)
      });
  }
  openAlertNewTask() {
    let alert = this.alertCtrl.create({
      title: 'Crear Tarea',
      message: 'Escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar nueva tarea',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            data.completed = false;
            this.taskService.insert(data)
              .then(response => {
                this.tasks.unshift(data);
              })
              .catch(error => {
                console.error(error)
              })
          }
        }
      ]
    });
    alert.present();
  }
  updateTask(task, index) {
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.taskService.update(task)
      .then(response => {
        this.tasks[index] = task;
      })
      .catch(error => {
        console.error(error);
      })
  }
  deleteTask(task: any, index) {
    this.taskService.delete(task)
      .then(response => {
        console.log(response);
        this.tasks.splice(index, 1);
      })
      .catch(error => {
        console.log(error);
      })

  }

}

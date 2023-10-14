import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  extypeData: any[] = [];
  selectedExType: string = '';
  inputExAmount: string = '';

  inctypeData: any[] = [];
  selectedIncType: string = '';
  inputIncAmount: string = '';

  exData: any[] = [];
  extypeSingleData: any[] = [];

  expenseForm: FormGroup;
  incomeForm: FormGroup;
  select: any;
  incData: any[] = [];

  exSumAmount: any[] = [];
  incSumAmount: any[] = [];
  totalAmount: any[] = [];

  constructor(
    private service: ApiserviceService,
    private fb: FormBuilder,
  ) {
    this.expenseForm = this.fb.group({
      inputExtypeID: [''],
      inputExAmount: ['']
    })

    this.incomeForm = this.fb.group({
      inputInctypeID: [''],
      inputIncAmount: ['']
    })
  }

  ngOnInit(): void {
    this.service.getAllExType().subscribe(response => {
      this.extypeData = response.data;
    })
    this.service.getAllIncType().subscribe(response => {
      this.inctypeData = response.data;
    })

    this.service.getAllEx().subscribe(response => {
      this.exData = response.data;
    })
    this.service.getAllInc().subscribe(response => {
      this.incData = response.data;
    })

    this.service.getExAmount().subscribe(response => {
      this.exSumAmount = response.data
    })
    this.service.getIncAmount().subscribe(response => {
      this.incSumAmount = response.data
    })
    this.service.getTotalAmount().subscribe(response => {
      this.totalAmount = response.data
    })
  }

  getExtypeName(extypeID: number): string {
    const extype = this.extypeData.find(item => item.extypeID === extypeID);
    return extype ? extype.extypeName : '';
  }
  getInctypeName(inctypeID: number): string {
    const inctype = this.inctypeData.find(item => item.inctypeID === inctypeID);
    return inctype ? inctype.inctypeName : '';
  }

  addExData() {
    const extypeID = this.expenseForm.value.inputExtypeID;
    const exAmount = this.expenseForm.value.inputExAmount;

    this.service.createEx(extypeID, exAmount).subscribe(() => {
      this.expenseForm.reset();
      window.location.reload();
    })
  }

  addIncData() {
    const inctypeID = this.incomeForm.value.inputInctypeID;
    const incAmount = this.incomeForm.value.inputIncAmount;

    this.service.createInc(inctypeID, incAmount).subscribe(() => {
      this.incomeForm.reset();
      window.location.reload();
    })
  }

  deleteAllExpenses() {
    Swal.fire({
      title: 'ต้องการลบรายการรายจ่ายทั้งหมด ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'แน่นอน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete all expenses
        this.service.deleteAllEx().subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  deleteAllIncome() {
    Swal.fire({
      title: 'ต้องการลบรายการรายจ่ายทั้งหมด ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'แน่นอน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete all income
        this.service.deleteAllInc().subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  deleteSingleExpenses(i: number) {
    Swal.fire({
      title: 'ต้องการลบรายจ่ายแถวนี้ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'แน่นอน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEx(this.exData[i].exID).subscribe(() => {
          this.exData.splice(i, 1);
        });
      }
    });
  }

  deleteSingleIncome(i: number) {
    Swal.fire({
      title: 'ต้องการลบรายจ่ายแถวนี้ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'แน่นอน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteInc(this.incData[i].incID).subscribe(() => {
          this.incData.splice(i, 1);
        });
      }
    });
  }

  editSingleExpenses(i: number) {
    const exData = this.exData[i]

    Swal.fire({
      title: `แก้ไขรายการรายจ่าย`,
      html: `
        <div class="grid grid-cols-4 place-items-center bg-orange-400 rounded-t text-stone-800 text-xl font-medium">
          <div class="bg-white py-1 w-full h-full"></div>
          <h3>ชนิด</h3>
          <h3>ราคา</h3>
          <h3>ราคา</h3>
        </div>
        <div class="grid grid-cols-4 place-items-center bg-stone-800 text-white overflow-hidden">
          <div class="w-full h-full bg-red-400 py-1">
            <p>เก่า</p>
          </div>
          <p>${this.getExtypeName(exData.extypeID)}</p>
          <p>${exData.exAmount}</p>
          <p>${exData.exDate}</p>
        </div>
        <div class="mt-16">
          <form class="grid grid-cols-[40%_40%] gap-4 w-full place-content-center" id="formEEF">
            <select id="inputEEID" name="extype" class="px-2 rounded bg-stone-800 text-white">
              <option value="" disabled selected>-- ชนิด --</option>
            </select>
            <div class="relative w-full">
              <span class="absolute ml-2 left-0 h-full flex justify-center items-center text-orange-400">฿</span>
              <input id="inputEEA" class="w-full h-full py-1 pl-6 rounded focus:outline-none bg-stone-800 text-white" placeholder="1000.00"/>
            </div>
          </form>
        </div>
      `,
      confirmButtonColor: 'rgb(251 146 60)',
      confirmButtonText: 'บันทึก',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      preConfirm: () => {
        const extypeIDEdit = document.querySelector('#inputEEID') as HTMLSelectElement;
        const exAmountEdit = document.querySelector('#inputEEA') as HTMLSelectElement;
        const exID = this.exData[i].exID;

        if (!extypeIDEdit || !exAmountEdit || !exAmountEdit.value) {
          Swal.fire({
            title: "แก้ไขไม่ได้!",
            text: "กรุณากรอกข้อมูลให้ครบ",
            icon: "error",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: 'rgb(251 146 60)'
          });
          return;
        }

        this.service.updateEx(extypeIDEdit.value, exAmountEdit.value, exID).subscribe(() => {
          window.location.reload();
        })
      }
    })

    const inputEEID = document.querySelector('#inputEEID') as HTMLSelectElement;

    if (inputEEID) {
      this.extypeData.forEach((item) => {
        const option = document.createElement('option')
        option.value = item.extypeID
        option.text = item.extypeName
        inputEEID.appendChild(option)
      })
    }

  }

  editSingleIncome(i: number) {
    const incData = this.incData[i]

    Swal.fire({
      title: `แก้ไขรายการรายรับ`,
      html: `
        <div class="grid grid-cols-4 place-items-center bg-orange-400 rounded-t text-stone-800 text-xl font-medium">
          <div class="bg-white py-1 w-full h-full"></div>
          <h3>ชนิด</h3>
          <h3>ราคา</h3>
          <h3>ราคา</h3>
        </div>
        <div class="grid grid-cols-4 place-items-center bg-stone-800 text-white overflow-hidden">
          <div class="w-full h-full bg-red-400 py-1">
            <p>เก่า</p>
          </div>
          <p>${this.getInctypeName(incData.inctypeID)}</p>
          <p>${incData.incAmount}</p>
          <p>${incData.incDate}</p>
        </div>
        <div class="mt-16">
          <form class="grid grid-cols-[40%_40%] gap-4 w-full place-content-center" id="formInEF">
            <select id="inputInEID" name="inctype" class="px-2 rounded bg-stone-800 text-white">
              <option value="" disabled selected>-- ชนิด --</option>
            </select>
            <div class="relative w-full">
              <span class="absolute ml-2 left-0 h-full flex justify-center items-center text-orange-400">฿</span>
              <input id="inputInEA" class="w-full h-full py-1 pl-6 rounded focus:outline-none bg-stone-800 text-white" placeholder="1000.00"/>
            </div>
          </form>
        </div>
      `,
      confirmButtonColor: 'rgb(251 146 60)',
      confirmButtonText: 'บันทึก',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      preConfirm: () => {
        const inctypeIDEdit = document.querySelector('#inputInEID') as HTMLSelectElement;
        const incAmountEdit = document.querySelector('#inputInEA') as HTMLSelectElement;
        const incID = this.incData[i].incID;

        if (!inctypeIDEdit || !incAmountEdit || !incAmountEdit.value) {
          Swal.fire({
            title: "แก้ไขไม่ได้!",
            text: "กรุณากรอกข้อมูลให้ครบ",
            icon: "error",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: 'rgb(251 146 60)'
          });
          return;
        }

        this.service.updateInc(inctypeIDEdit.value, incAmountEdit.value, incID).subscribe(() => {
          window.location.reload();
        })
      }
    })

    const inputInEID = document.querySelector('#inputInEID') as HTMLSelectElement;

    if (inputInEID) {
      this.inctypeData.forEach((item) => {
        const option = document.createElement('option')
        option.value = item.inctypeID
        option.text = item.inctypeName
        inputInEID.appendChild(option)
      })
    }

  }
}


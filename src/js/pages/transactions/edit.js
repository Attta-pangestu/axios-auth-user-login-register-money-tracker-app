import CheckUserAuth from "../auth/check-user-auth";
import Transaction from "../../network/transactions";

const Edit = {
  async init() {
    this._initialUI();
    await this._initialData();
    // this._initialListener();
  },

  _initialUI() {
    const listInputRadioTransactionType = [
      {
        inputId: 'recordType1',
        value: 'income',
        caption: 'Pemasukan',
        required: true,
      },
      {
        inputId: 'recordType2',
        value: 'expense',
        caption: 'Pengeluaran',
        required: true,
      },
    ];

    const inputRadioTransactionTypeEdit = document.querySelector('#inputRadioTransactionTypeEdit');
    inputRadioTransactionTypeEdit.setAttribute(
      'listRadio',
      JSON.stringify(listInputRadioTransactionType),
    );
  },

  async _initialData() {
    const transactionId = this._getTransactionId();
    console.log('Transaksi IDnya adalah ', transactionId) ; 
    if (!transactionId) {
      alert(`Data dengan id ${transactionId} yang dicari tidak ditemukan`);
      return;
    }
    // const fetchRecords = await fetch('/data/DATA.json');
    // const responseRecords = await fetchRecords.json();
    // const userTransactionsHistory = responseRecords.results.transactionsHistory;

    const dataRecord = await this._getTransactionData(transactionId) ; 
    console.log('Ini isi dari data Record') ; 
    console.log(dataRecord) ; 

    this._populateTransactionToForm(dataRecord);
  },

  _initialListener() {
    const editRecordForm = document.querySelector('#editRecordForm');
    editRecordForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        editRecordForm.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _getTransactionData(id) {
      try{
        const response = await Transaction.getIdTransaction(id) ; 
        console.log(response) ; 
        return response.data.results ; 
      }
      catch(error) {
        console.log('Terjadi Error Saat Mengambil Data Transaksi ID : ', error) ; 
      }
  }, 

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
      // this._goToDashboardPage();
    } ; 

    try{
      const response = await Transaction.editTransaction(Number(this._getTransactionId), formData) ;
      
    }
    catch(error) {
      console.log('Terjadi Error Saat Melakukan Update Transaksi :  ', error) ; 
    }

  },

  _getFormData() {
    const nameInput = document.querySelector('#validationCustomRecordName');
    const amountInput = document.querySelector('#validationCustomAmount');
    const dateInput = document.querySelector('#validationCustomDate');
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    const descriptionInput = document.querySelector('#validationCustomNotes');
    const typeInput = document.querySelector('input[name="recordType"]:checked');

    return {
      name: nameInput.value,
      amount: Number(amountInput.value),
      date: new Date(dateInput.value),
      evidence: evidenceInput.files[0],
      description: descriptionInput.value,
      type: typeInput.value,
    };
  },

  _populateTransactionToForm(transactionRecord = null) {
    if (!(typeof transactionRecord === 'object')) {
      throw new Error(
        `Parameter transactionRecord should be an object. The value is ${transactionRecord}`,
      );
    }

    const nameInput = document.querySelector('#validationCustomRecordName');
    const amountInput = document.querySelector('#validationCustomAmount');
    const dateInput = document.querySelector('#validationCustomDate');
    const evidenceInput = document.querySelector('#validationCustomEvidenceImgChange');
    const descriptionInput = document.querySelector('#validationCustomNotes');
    const typesInput = document.querySelectorAll('input[name="recordType"]');

    nameInput.value = transactionRecord.name;
    amountInput.value = transactionRecord.amount;
    dateInput.value = transactionRecord.date.slice(0,16);
    evidenceInput.style.backgroundImage = `url(${transactionRecord.evidenceUrl})`;
    console.log('Ini link gambarnya ya  ', transactionRecord.evidenceUrl)
    // evidenceInput.setAttribute('alt', transactionRecord.name);
    descriptionInput.value = transactionRecord.description;
    typesInput.forEach((item) => {
      item.checked = item.value === transactionRecord.type;
    });
  },

  _validateFormData(formData) {
    delete formData.evidence;
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _getTransactionId() {
    const searchParamEdit = new URLSearchParams(window.location.search);
    return searchParamEdit.has('id') ? searchParamEdit.get('id') : null;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Edit;

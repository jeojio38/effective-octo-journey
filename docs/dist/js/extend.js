window.onload = function () {
  var links = document.querySelectorAll('.nav-link');
  var linkArr = Array.prototype.slice.call(links);
  linkArr.forEach((element) => {
    if (element.href == 'https://bitkeep.com/') {
      element.setAttribute(
        'title',
        'The Best Decentralized Multi-chain Crypto Wallet'
      );
    }
  });

  if (location.href.indexOf('how-to-connect') > -1) {
    location.href = location.href.replace(
      'how-to-connect',
      'connect-wallet-for-dapp'
    );
  }

  window.bit_doc_verison = '1.0.3';

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
};



export class AsyncScript  {
    constructor(private opts) {}

    public async init(args) {
      const co = this.opts.addOpts;
      let data = null;
      let rejected = false;
      let timeout = false;
      let resulted = false;
      let loading = true;
      try {
        
        data = await new Promise((resolve, reject) => {
          const t = setTimeout(() => {
            timeout = true;
            reject();
          }, co.timeout || 4000);
          this.opts.addOpts
            .promise(this.opts, args)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            })
            .finally(() => {
              clearTimeout(t);
            });
        });
      } catch (err) {
        data = err
        rejected = true
      } finally {
        loading = false;
        resulted = true;
        if(co.errorCatcher) {
          const isError = co.errorCatcher(this.opts, data)
          if(isError) {
            rejected = true
          }
        }
        this.opts.setStatus('done', {
          data,
          rejected,
          timeout,
          resulted,
          loading,
        });
        this.opts.drop();
      }
    }
    watch(args) {
      if (args.statius === 'cancel') {
        this.opts.setStatus('done', {
          data: null,
          rejected: false,
          timeout: false,
          resulted: false,
          loading: false,
        });
        this.opts.drop();
      }
    }
}
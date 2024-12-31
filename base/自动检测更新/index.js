/**
 * 检查更新版本
 * @example
 *  const checkUpdateVersion = new CheckUpdateVersion();
 *  checkUpdateVersion.start({
 *   onUpdate: () => {
 *    if(confirm('是否更新版本？')){
 *       window.location.reload();
 *    }else{
 *       return Promise.reject();
 *    }
 *   }
 *  });
 */
class CheckUpdateVersion {
  constructor() {
    const noop = () => Promise.resolve();

    // 是否在请求中
    this.isFetching = false;
    // 定时器的句柄
    this.checkTimer = null;
    // 每1次检测间隔为 10 秒
    this.intervalTime = 10 * 1000;
    // 如果用户取消更新，则1分钟后再提示，避免频繁提示
    this.cooldownTime = 60 * 1000;
    this.cooldownTimeout = null;

    // 检测更新回调，要返回 promise 对象
    this.onUpdate = noop;
  }

  delayUpdate() {
    // 设置冷却时间，避免频繁打扰用户
    this.cooldownTimeout = setTimeout(() => {
      clearTimeout(this.cooldownTimeout);
      this.cooldownTimeout = null;
    }, this.cooldownTime);
  }

  // 检查 ETag 并提示用户更新
  checkForUpdates() {
    const oldEtag = localStorage.getItem('etag');
    this.isFetching = true;
    fetch('/index.html', { headers: { 'If-None-Match': oldEtag }, cache: 'no-store' })
      .then((response) => {
        if (response.ok && response.status !== 304) {
          const newEtag = response.headers.get('etag');
          // 如果有新版本，则提示用户更新
          if (newEtag && newEtag !== oldEtag) {
            localStorage.setItem('etag', newEtag);
            this.onUpdate().catch(() => {
              this.isFetching = false;
              this.delayUpdate();
            });
          } else {
            this.isFetching = false;
          }
        } else {
          this.isFetching = false;
        }
      })
      .catch(() => {
        this.isFetching = false;
      });
  }

  pollingCheck = () => {
    if (this.isFetching || this.cooldownTimeout) return;
    clearInterval(this.checkTimer);

    this.checkTimer = setInterval(() => {
      this.checkForUpdates();
    }, this.intervalTime);
  };

  onLoad = () => {
    this.pollingCheck();
  };
  onVisibilityChange = () => {
    if (this.isFetching) return;
    clearTimeout(this.cooldownTimeout);
    const visibleState = document.visibilityState;

    if (visibleState === 'visible') {
      this.pollingCheck();
    } else {
      clearInterval(this.checkTimer);
    }
  };

  start({ onUpdate }) {
    this.onUpdate = onUpdate;

    window.addEventListener('load', this.onLoad);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  destroy() {
    clearInterval(this.checkTimer);
    clearTimeout(this.cooldownTimeout);
    window.removeEventListener('load', this.onLoad);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }
}

export default CheckUpdateVersion;

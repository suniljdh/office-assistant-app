import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/admin/auth.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { PermissionService } from '../services/admin/permission.service';
import { IUserPermission } from '../model/i-user-permission';

@Component({
  selector: 'oa-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Office Assistant';
  mobileQuery: MediaQueryList;

  // fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  permittedRoutes: IUserPermission[] = [];
  private _mobileQueryListener: () => void;

  constructor(
    private permissionService: PermissionService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    public authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.iconRegistry.addSvgIcon(
      'menu',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-menu-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'user',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-account_circle-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'expand',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-expand_more-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'profile',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-build-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'notification-active',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-notifications_active-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'notification-inactive',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-notifications_off-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'logout',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-exit_to_app-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'formIcon',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-play_arrow-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'save',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-save-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'refresh',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-autorenew-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'previous',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-navigate_before-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'next',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-navigate_next-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'search',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-search-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'email',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-email-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-delete_sweep-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'print',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-local_printshop-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'settings',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-settings-20px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'help',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-help-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'exit',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-close-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'addItem',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-add-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'remove',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-remove-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'removeItem',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-clear-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'chevron_right',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-chevron_right-24px.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'expand_more',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'src/assets/icons/svg/baseline-expand_more-24px.svg'
      )
    );
  }

  ngOnInit(): void {
    this.permissionService
      .FetchUserPermissions('hardik')
      .subscribe((resp: IUserPermission[]) => {
        this.permittedRoutes = resp;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  LogOut() {
    this.authService.LogOut();
    this.router.navigate(['/']);
  }
}

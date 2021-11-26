import { Module } from '@nestjs/common';
import { AbstractCommunityApp } from '../apps.utils';
import { ProjectAService } from './project-a.service';

@Module({
  providers: [ProjectAService],
  exports: [ProjectAService],
})
export class ProjectAModule extends AbstractCommunityApp<ProjectAModule>() {}
